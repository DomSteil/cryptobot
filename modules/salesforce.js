"use strict";

let nforce = require('nforce'),

    SF_CLIENT_ID = process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET,
    SF_USER_NAME = process.env.SF_USER_NAME,
    SF_PASSWORD = process.env.SF_PASSWORD,

    org = nforce.createConnection({
        clientId: SF_CLIENT_ID,
        clientSecret: SF_CLIENT_SECRET,
        redirectUri: 'http://localhost:3000/oauth/_callback',
        mode: 'single',
        autoRefresh: true
    });

let login = () => {

    org.authenticate({username: SF_USER_NAME, password: SF_PASSWORD}, err => {
        if (err) {
            console.error("Authentication error");
            console.error(err);
        } else {
            console.log("Authentication successful");
        }
    });

};

let findAccount = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Phone, BillingStreet, BillingCity, BillingState FROM Account WHERE Name LIKE '%" + name + "%' LIMIT 5";
        org.query({query: q}, (err, resp) => {
            if (err) {
                console.log(err);
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let findContact = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Phone, MobilePhone, Email FROM Contact WHERE Name LIKE '%" + name + "%' LIMIT 5";
        org.query({query: q}, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let findOpportunity = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Amount, Probability, StageName, CloseDate FROM Opportunity WHERE Name LIKE '%" + name + "%' ORDER BY amount DESC LIMIT 5";
        org.query({query: q}, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};


let findProposals = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Apttus_Proposal__Amount__c, Apttus_Proposal__Account__c, Apttus_Proposal__Opportunity__c, Apttus_Proposal__Approval_Stage__c FROM Apttus_Proposal__Proposal__c WHERE Name LIKE '%" + name + "%' ORDER BY amount DESC LIMIT 5";
        org.query({query: q}, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};



let findAgreement = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Apttus__Account__c, Apttus__Contract_End_Date__c, Apttus__Contract_Start_Date__c, Apttus__Primary_Contact__c, Apttus__Status_Category__c, Apttus__Total_Contract_Value__c FROM Apttus__APTS_Agreement__c WHERE Name LIKE '%" + name + "%' ORDER BY amount DESC LIMIT 5";
        org.query({query: q}, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let findAsset = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Apttus_Config2__AssetStatus__c, Apttus_Config2__EndDate__c, Apttus_Config2__LineType__c, Apttus_Config2__PriceMethod__c, Apttus_Config2__PriceType__c,  FROM Apttus_Config2__AssetLineItem__c WHERE Name LIKE '%" + name + "%' ORDER BY amount DESC LIMIT 5";
        org.query({query: q}, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};


let findOrder = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Total_Order_Amount__c, Apttus_Config2__Type__c, Apttus_Config2__ActivatedDate__c FROM Apttus_Config2__Order__c WHERE Name LIKE '%" + name + "%' ORDER BY amount DESC LIMIT 5";
        org.query({query: q}, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let findInvoice = name => {

    return new Promise((resolve, reject) => {
        let q = "SELECT Id, Name, Apttus_Billing__Status__c FROM Apttus_Billing__Invoice__c WHERE Name LIKE '%" + name + "%' ORDER BY amount DESC LIMIT 5";
        org.query({query: q}, (err, resp) => {
            if (err) {
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};


let getTopOpportunities = count => {

    count = count || 5;

    return new Promise((resolve, reject) => {
        var q = "SELECT Id, Name, Amount, Probability, StageName, CloseDate FROM Opportunity WHERE isClosed=false ORDER BY amount DESC LIMIT " + count;
        org.query({query: q}, (err, resp) => {
            if (err) {
                console.error(err);
                reject("An error as occurred");
            } else {
                resolve(resp.records);
            }
        });
    });

};

let createContact = contact => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Contact');
        c.set('firstName', contact.firstName);
        c.set('lastName', contact.lastName);
        c.set('title', contact.title);
        c.set('phone', contact.phone);
        c.set('email', contact.email);
        org.insert({sobject: c}, (err, resp) => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a contact");
            } else {
                resolve(c);
            }
        });
    });

};

let createQuote = quote => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Apttus_Proposal__Proposal__c');
        c.set('Apttus_Proposal__Proposal_Name__c', quote.name);
        c.set('Apttus_Proposal__Opportunity__c', '00636000008xUJv');
        c.set('Apttus_QPConfig__PriceListId__c', 'a1f36000000dL7X');

        org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating the quote");
            } else {
                resolve(c);
            }
        });
    });

};


let createAgreement = agreement => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Apttus__APTS_Agreement__c');
        c.set('Name', agreement.name);
        c.set('Apttus__Contract_Start_Date__c', agreement.startDate);
        c.set('Apttus__Contract_End_Date__c', agreement.closeDate);
        c.set('Apttus__Status__c', agreement.status);

        org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating an agreement");
            } else {
                resolve(c);
            }
        });
    });

};

let createCase = newCase => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Case');
        c.set('subject', newCase.subject);
        c.set('description', newCase.description);
        c.set('origin', 'Slack');
        c.set('status', 'New');

        org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a case");
            } else {
                resolve(c);
            }
        });
    });

};

 let createISR = isr => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('ISR');
        c.set('Related_To__c', isr.isr);
        c.set('Start__c', isr.start);
        c.set('End__c', isr.close);
        c.set('SE_Event_Type__c', isr.type);
        c.set('SE_Activity_Type__c', isr.activity);

                org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating the ISR");
            } else {
                resolve(c);
            }
        });
    });
};

 let createNDA = nda => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Apttus__APTS_Agreement__c');
        c.set('Apttus__Account__c', '0013600000Koh0L');
        c.set('Apttus__Primary_Contact__c', '0033600000G2P95');
        c.set('What_is_being_disclosed__c', nda.disclosed);

                org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating the NDA");
            } else {
                resolve(c);
            }
        });
    });
};

let createCart = cart => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Slack_Requests__c');
        c.set('Name', 'Cart Creation');
        c.set('CPQ_Actions__c', 'Create Cart');
        c.set('Type__c', 'CPQ');
        c.set('Product_Name__c', cart.productName);
        c.set('Quantity__c', cart.quantity);
        c.set('Discount__c', cart.discount);

                org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occured while creating the Cart");
            } else {
                resolve(c);
            }
        });
    });
};


let createTask = task => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Activity');
        c.set('Who', task.who);
        c.set('Type', task.type);
        c.set('Status', task.status);
        c.set('CallDurationInSeconds', task.callDuration);
        c.set('Location__c', task.location);
        c.set('Product__c', task.product);

                org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occured while creating the Task");
            } else {
                resolve(c);
            }
        });
    });
};

login();

exports.org = org;
exports.findAccount = findAccount;
exports.findContact = findContact;
exports.findOpportunity = findOpportunity;
exports.findProposals = findProposals;
exports.findAgreement = findAgreement;
exports.findInvoice = findInvoice;
exports.findOrder = findOrder;
exports.findAsset = findAsset;
exports.getTopOpportunities = getTopOpportunities;
exports.createContact = createContact;
exports.createAgreement = createAgreement;
exports.createQuote = createQuote;
exports.createCase = createCase;
exports.createISR = createISR;
exports.createNDA = createNDA;
exports.createCart = createCart;
exports.createTask = createTask;

