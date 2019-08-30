package com.dit.ebay.model;

/*
 * 1) when we create message we insert it as DEL_NON
 * 2) if (sender deletes) => DEL_SEN, if (receiver deletes) => DEL_REC
 * 3) if we get a new delete request and message table has state DEL_SEN or DEL_REC then we remove the entry
 */
public enum MessageDeleteState {
    DEL_NON, // no one deleted the message
    DEL_SEN, // only sender deleted the message
    DEL_REC, // only receiver deleted the message
}