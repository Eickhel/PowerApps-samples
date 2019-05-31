# PowerTwitter - Sentiment Analysis edition

The latest updated version available with Sentiment Analysis is: [20190220](https://github.com/Eickhel/PowerApps-samples/blob/master/PowerTwitter/packages/PowerTwitter_20190220182038.zip)

## Prerequisites
You will need to have an Azure Cognitive Service's Text Analytics API key in order to analyze the sentiment of the tweets. You can request a free instance that is good for 5,000 transactions per month [in this link](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/text-analytics/)

## First time setup
First, go to the releases tab and download the latest stable versions. You will also find releases under the packages folder but treat these versions as under-development.

The next step is to go to the [PowerApps](https://web.powerapps.com) to import the package as seen in the next image:

![Setup 1](/PowerTwitter/images/setup1.jpg) 

If this is the first time installing the app, you will need to set the "import setup" of the app to "Create as new" instead of "Update". As for the "Text Analytics Connection", click on "Select during import" and then select from the list of connections if you've already created this connection. If this is your first time, simply press "Create new" and this will open a new tab with the available connections for your PowerApps. Press "New connection" and look for "Text Analytics (preview)" and click the plus sign.

![Setup 2](/PowerTwitter/images/setup2.jpg)

You will be required to input the Account Key and the Site URL of your Azure's Text Analytics service. How to get these? go to the Azure portal, find your Cognitive Service and under Keys you will get the Account Key:

![Setup 3](/PowerTwitter/images/setup3.jpg)

And under "Overview" you will get the Site URL as the Endpoint:

![Setup 4](/PowerTwitter/images/setup4.jpg)

You can close the connections tab and go back to the Import setup. After hitting "Refresh list" you will see the newly created connection for the sentiment analysis. Select it and hit save. Finally press Import to start the process.

After a couple of minutes you will have PowerTwitter in the list of your PowerApps :grin:

![Setup 5](/PowerTwitter/images/setup5.jpg)

## How to use it
The first time you run PowerTwitter it will ask you to set permissions for the Twitter connector by simply sign in to the service. 

**Keep in mind** that you will be able to switch users inside the application but the account that will be used for tweeting will be the one you're sign in now.

![How to use it 1](/PowerTwitter/images/use1.jpg)

After signing in, PowerTwitter will be loaded into PowerApps. Remember that you can use the menu to access the app features.

![How to use it 2](/PowerTwitter/images/use2.jpg)

Just press play and enjoy! 