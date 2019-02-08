'use strict';

const fs = require('fs');
const path = require('path');
const Config = require('../config');
const Debug = require('debug')('renew');
const { performance } = require('perf_hooks');

// parse xml
Debug('parsing and loading treatments');
const t0 = performance.now();
const parsex = require('./renew/parsex');

const xmlsArr = fs.readdirSync(`${xmldir}/data`);
let i = 0;
let j = xmlsArr.length;

let treatments = [];
for (; i < j; i++) {


    const xml = fs.readFileSync(`${xmldir}/data/${xmlsArr[i]}`, 'utf8');
    const treatment_id = path.basename(xmlsArr[i], '.xml');

    const treatment = parsex.cheerioparse(xml, treatment_id);
    treatments.push(JSON.stringify(treatment));
}


fs.writeFileSync(`${xmldir}/json/treatments.jsonl`, treatments.join('\n'), 'utf8');
const t1 = performance.now();
Debug('parsing and loading ' + i + ' treatments took ' + (t1 - t0) + ' ms')