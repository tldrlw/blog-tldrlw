# blog-tldrlw

## has shared resources

- meaning there are infrastructure components in this repo that are used for other applications running in us-east-1 for tldrlw

  - e.g., alb, vpc, ecs cluster and logging for all tldrlw apps

## notes

- 9/26/24 - added sitemap, reduced ECS task count to 1, updated meta title and description, added www.blog r53 record, updated blog 2
- 11/1/24 - grafana needs the grafana-datasources.yaml config file to configure its data source as loki, tried to add a container start up script that would pull the yaml from s3 and then restart the service, but it wan't working, so baking in the yaml in the docker build for that yaml to be available when ECS pulls the image and starts grafana
- 11/3/24 - spent a lot of time figuring out how to set up the right shipper/forwarder to send cloudwatch logs to loki and then grafana, notes on this available in `logging.md`
