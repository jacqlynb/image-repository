const { expect, it } = require('@jest/globals');
const request = require('supertest');
const { app } = require('../server');

const mockData = {
  image_url:
    'https://www.artic.edu/iiif/2/113441f3-6b29-4e4b-4862-4105bbed83ec/full/843,/0/default.jpg',
  title: "The Great Gate, Lincoln's Inn",
  labels:
    'Person:98.73,Human:98.73,Architecture:92.97,Building:92.97,Castle:91.1,Painting:82.43,Art:82.43,Drawing:77.59,Fort:77.31,Plan:66.46,Diagram:66.46,Plot:66.46,Spire:65.47,Steeple:65.47,Tower:65.47,Housing:59.54,Archaeology:55.34,Sketch:55.18',
  author: 'Joseph Pennell',
  date_display: '1905',
  labels_filtered: [
    {
      label: 'Castle',
      confidenceScore: '91.1',
    },
  ],
};

describe('GET /image', () => {
  it('gets images without labels', async () => {
    const { body } = await request(app).get('/image');

    expect(body).toContainEqual({
      image_url: expect.anything(),
      title: expect.anything(),
      author: expect.anything(),
      date_display: expect.anything(),
    });
  });

  it('gets images by label', async () => {
    const { body } = await request(app).get('/image?labels=tree');

    expect(body).toContainEqual({
      image_url: expect.anything(),
      title: expect.anything(),
      author: expect.anything(),
      labels: expect.anything(),
      labels_filtered: expect.anything(),
      date_display: expect.anything(),
    });
  });
});

describe('get data from endpoints', () => {
  it('get images with unique label', async () => {
    const { body } = await request(app).get('/image?labels=castle');
    expect(body.length).toEqual(1);
    expect(body[0]).toEqual(mockData);
  });

  it('get images with non-unique label (with ordering)', async () => {
    const { body } = await request(app).get('/image?labels=person');
    const firstConfidenceScore = Number(
      body[0].labels_filtered[0].confidenceScore
    );
    const secondConfidenceScore = Number(
      body[1].labels_filtered[0].confidenceScore
    );
    const lastConfidenceScore = Number(
      body[body.length - 1].labels_filtered[0].confidenceScore
    );
    expect(firstConfidenceScore).toBeGreaterThan(secondConfidenceScore);
    expect(secondConfidenceScore).toBeGreaterThan(lastConfidenceScore);
  });

  it('get images with multiple labels (with ordering)', async () => {
    const { body } = await request(app).get(
      '/image?labels=sculpture,statue,bronze'
    );
    expect(body[0].title).toEqual('Ship Figurehead: Native American Bust');
    expect(body[1].title).toEqual('Female Figure');
  });

  it('get images with nonexistent label', async () => {
    const { body } = await request(app).get('/image?labels=asdf');
    expect(body.length).toEqual(0);
  });
});
