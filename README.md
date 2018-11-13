<!--
title: 'AWS Node Scheduled Weather example in NodeJS'
description: 'This is an example of creating a function that runs as a cron job using the serverless ''schedule'' event. It retrieves weather information at 10am (UTC) and emails it to a predefined recipient.'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
-->
# AWS Node Scheduled Weather Example

This is an example of creating a function that runs as a cron job using the serverless `schedule` event. It retrieves weather information every hour and stores it in a DynomDB Database. For more information on `schedule` event check out the Serverless docs on [schedule](https://serverless.com/framework/docs/providers/aws/events/schedule/).

## Cron syntax

Read the [AWS cron expression syntax](http://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html) docs for more info on how to setup cron

## Setup

### Install Serverless
 
[Serverless Quick Start](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)

[AWS - Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### OpenWeatherMap.org

Please visit https://openweathermap.org to register for a free API token.

### Configuration

Upon setting up access to both external services, you'll be required to update the environment variables in `serverless.yml`:

```
environment:
    WEATHER_APPID: cbf3242865fa6678c01628ab8938d7 <your own WeatherId>
```

## Deploy

In order to deploy the you endpoint simply run

```bash
serverless deploy
```
