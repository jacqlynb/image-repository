# image-repository
Image repository coding challenge for Shopify Backend Developer Internship Winter '22.

### About
An app for searching art images by content labels. Image data is sourced from the Art Institute of Chicago's Open Access Images and enriched with content labels using the Amazon Rekognition API.

Built with Node, React and MySQL. 

#### Backend API
Single GET endpoint `/image`. Accepts an optional `labels` param, which can be used like `?labels=label1,label2,label3`.

#### Seed script
Script for seeding the database with images and content labels. Pulls images from the Art Institute of Chicago's Open Access Images and labels them with Amazon Rekognition, which uses machine learning to analyze images for objects, actions, and scenes. 

### Demo
[img-repo.jacqlynbender.com](http://img-repo.jacqlynbender.com)

### Getting Started

1. clone the repo: 
   ```sh
   git clone https://github.com/jacqlynb/image-repository.git
   ```
1. install node modules
   ```sh
   cd api && yarn install
   ```
   ```sh
   cd client && yarn install
   ```
1. download and unzip the Art Institute of Chicago data dump from https://artic-api-data.s3.amazonaws.com/artic-api-data.tar.bz2
1. configure environment variables (see `.env-example`)
1. seed the database
   ```sh
   cd api && yarn seed
   ```
1. run the server
   ```sh
   cd api && yarn start
   ```
1. run the client
   ```sh
   cd client && yarn start
   ```

### Acknowledgements
[Art Institute of Chicago Open Access Images](https://www.artic.edu/open-access/open-access-images)</br>
[Amazon Rekognition API](https://docs.aws.amazon.com/rekognition/latest/dg/API_Reference.html)

