# Deployment

```
IPv4 Public IP
18.140.59.30
```

## Deploying to AWS EC2

## Deploying to Kubernetes

### Installing gcloud command line interface

Download the latest gcloud tools from here: https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version

Extract the tarball
`tar -xvzf ~/Downloads/google-cloud-sdk-267.0.0-darwin-x86_64.tar.gz`

Install it
`cd ~/Downloads`
`./google-cloud-sdk/install.sh`

Follow the onscreen instructions. Once you've completed the install, open a new
terminal (or source your .zshrc/.bashrc file)

Now you should be able to initialize your gcloud tools
`gcloud init`

### Authenticate with Gcloud

Login to your google account
`gcloud auth login`

This will open up a google sign in page requesting permission for Google Cloud
SDK go manage your Google Cloud Platform services. Click on "Allow"

### Build your docker image

Run your docker app and start building
`docker build . -t jimat-pwa`

Add a tag to the docker image
`docker tag jimat-pwa asia.gcr.io/jimat-253709/jimat-pwa`

Authenticate docker-configure for gcloud
`gcloud auth configure-docker`

Now you should be able to push your docker image to Google's Container Registry
`docker push asia.gcr.io/jimat-253709/jimat-pwa`
Note: `jimat-254709` is the jimat-ecosystem project's ID.

### Readying for deploy

Install kubectl if you don't already have it
`gcloud components install kubectl`

Generate a kubeconfig entry
`gcloud container clusters get-credentials jimat-ecosystem`

Deploy your app pod
`kubectl apply -f deployment.yaml`

Deploy your service pod
`kubectl apply -f service.yaml`

Get your deployed app's external IP
`kubectl get services`

Open the ip in a browser, and you should see your app running!
