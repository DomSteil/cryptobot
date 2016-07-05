"use strict";

let color = "#62A70F";

let formatAccounts = accounts => {

    if (accounts && accounts.length>0) {
        let attachments = [];
        accounts.forEach(account => {
            let fields = [];
            fields.push({title: "Name", value: account.get("Name"), short:true});
            fields.push({title: "Link", value: "https://login.salesforce.com/" + account.getId(), short:true});
            fields.push({title: "Phone", value: account.get("Phone"), short:true});
            fields.push({title: "Address", value: account.get("BillingStreet") + ", " + account.get("BillingCity") + " " + account.get("BillingState"), short:true});
            attachments.push({color: color, fields: fields});
        });
        return attachments;
    } else {
        return [{text: "No records"}];
    }

};

let formatContacts = contacts => {

    if (contacts && contacts.length>0) {
        let attachments = [];
        contacts.forEach(contact => {
            let fields = [];
            fields.push({title: "Name", value: contact.get("Name"), short:true});
            fields.push({title: "Link", value: "https://login.salesforce.com/" + contact.getId(), short:true});
            fields.push({title: "Phone", value: contact.get("Phone"), short:true});
            fields.push({title: "Mobile", value: contact.get("MobilePhone"), short:true});
            fields.push({title: "Email", value: contact.get("Email"), short:true});
            attachments.push({color: color, fields: fields});
        });
        return attachments;
    } else {
        return [{text: "No records"}];
    }

};

let formatContact = contact => {

    let fields = [];
    fields.push({title: "Name", value: contact.get("FirstName") + " " + contact.get("LastName"), short:true});
    fields.push({title: "Link", value: "https://login.salesforce.com/" + contact.getId(), short:true});
    fields.push({title: "Title", value: cont/act.get("Title"), short:true});
    fields.push({title: "Phone", value: contact.get("Phone"), short:true});
    fields.push({title: "Email", value: contact.get("Email"), short:true});
    return [{color: color, fields: fields}];

};

let formatOpportunities = opportunities => {

    if (opportunities && opportunities.length>0) {
        let attachments = [];
        opportunities.forEach(opportunity => {
            let fields = [];
            fields.push({title: "Opportunity", value: opportunity.get("Name"), short:true});
            fields.push({title: "Link", value: "https://login.salesforce.com/" + opportunity.getId(), short:true});
            fields.push({title: "Stage", value: opportunity.get("StageName"), short:true});
            fields.push({title: "Close Date", value: opportunity.get("CloseDate"), short:true});
            fields.push({title: "Amount", value: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(opportunity.get("Amount")), short:true});
            fields.push({title: "Probability", value: opportunity.get("Probability") + "%", short:true});
            attachments.push({color: color, fields: fields});
        });
        return attachments;
    } else {
        return [{text: "No records"}];
    }

};


let formatFindQuotes = findQuote => {

    if (quotes && quotes.length>0) {
        let attachments = [];
        quotes.forEach(findQuote => {
            let fields = [];
            fields.push({title: "Quote Name", value: findQuote.get("Name"), short:true});
            fields.push({title: "Link", value: "https://login.salesforce.com/" + findQuote.getId(), short:true});
            fields.push({title: "Opportunity", value: findQuote.get("Apttus_Proposal__Opportunity__c"), short:true});
            fields.push({title: "Amount", value: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(findQuote.get("Apttus_Proposal__Amount__c")), short:true});
            fields.push({title: "Status", value: findQuote.get("Apttus_Proposal__Approval_Stage__c") + "%", short:true});
            attachments.push({color: color, fields: fields});
        });
        return attachments;
    } else {
        return [{text: "No records"}];
    }

};

let formatCase = _case => {

    let fields = [];
    fields.push({title: "Subject", value: _case.get("subject"), short: true});
    fields.push({title: "Link", value: 'https://login.salesforce.com/' + _case.get("id"), short: true});
    fields.push({title: "Description", value: _case.get("description"), short: false});
    return [{color: color, fields: fields}];

};

let formatQuote = quote => {

    let fields = [];
    fields.push({title: "Quote Name", value: quote.get("Apttus_Proposal__Proposal_Name__c"), short: true});
    fields.push({title: "Opportunity", value: "Venture - Hardware and Software", short: true});
    fields.push({title: "Price List", value: "Tier 1 Hardware & Software", short: true});
    fields.push({title: "Link", value: '<' +'https://login.salesforce.com/apex/Apttus_QPConfig__ProposalConfiguration?id=' + quote.get("id") + '&amp;useAdvancedApproval=true&amp;useDealOptimizer=true&amp;method=csrFlow&amp;flow=tier1angular'+'|Configure Products'+ '>', short: true});
    return [{color: color, fields: fields}];

};

let formatAgreement = agreement => {

    let fields = [];
    fields.push({title: "Name", value: agreement.get("Name"), short: true});
    fields.push({title: "Start Date", value: agreement.get("Apttus__Contract_Start_Date__c"), short: true});
    fields.push({title: "Close Date", value: agreement.get("Apttus__Contract_End_Date__c"), short: false});
    fields.push({title: "Type", value: "MSA", short: false});
	fields.push({title: "Status", value: agreement.get("Apttus__Status__c"), short: false});
    fields.push({title: "Link", value: 'https://login.salesforce.com/' + agreement.get("id"), short: true});
    return [{color: color, fields: fields}];

};


let formatISR = _isr => {

    let fields = [];
    fields.push({title: "ISR Number", value: _isr.get("Related_To__c"), short: true});
    fields.push({title: "Start", value: _isr.get("Start__c"), short: true});
    fields.push({title: "Close", value: _isr.get("End__c"), short: false});
    fields.push({title: "Type", value: _isr.get("SE_Event_Type__c"), short: false});
    fields.push({title: "Activity", value: _isr.get("SE_Activity_Type__c"), short: false});
    return [{color: color, fields: fields}];

};

let formatNDA = nda => {

    let fields = [];
    fields.push({title: "Account:", value: "Venture Industries", short: true});
    fields.push({title: "Contact:", value: "Diego Francis", short: true});
    fields.push({title: "Information Disclosed:", value: nda.get("What_is_being_disclosed__c"), short: true});
    fields.push({title: "Type:", value: "NDA", short: true});
    return [{color: color, fields: fields}];

};


exports.formatAccounts = formatAccounts;
exports.formatContacts = formatContacts;
exports.formatContact = formatContact;
exports.formatOpportunities = formatOpportunities;
exports.formatCase = formatCase;
exports.formatQuote = formatQuote;
exports.formatFindQuotes = formatFindQuotes;
exports.formatAgreement = formatAgreement;
exports.formatISR = formatISR;
exports.formatNDA = formatNDA;