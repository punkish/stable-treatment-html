'use strict';

const Debug = require('debug')('parsex');
const cheerio = require('cheerio');
const dataDict = require('./data-dictionary');

const parsex = {

    parseMaterialCitations: function(matcit) {
        const mc = [];
        if (matcit.length) {
            for (let i = 0, j = matcit.length; i < j; i++) {
                let materialCitation = {};
                
                let testValues = '';
                dataDict.materialCitations.forEach(el => {
                    materialCitation[el["Plazi Field"]] = matcit[i].attribs[el["Plazi Field"]];
                    testValues += matcit[i].attribs[el["Plazi Field"]];
                })

                if (testValues) {
                    mc.push(materialCitation)
                }
            }
        }
        return mc;
    },

    parseTreatmentCitations: function($) {
        const trecit = $('treatmentCitation');
        const tc = [];
        if (trecit.length) {
            
            for (let i = 0, j = trecit.length; i < j; i++) {
                const tci = $(trecit[i]);

                let treatmentCitation = tci.text();
                let bib = $('bibRefCitation', tci).text();
                if (bib) {
                    treatmentCitation += ' sec. ' + bib
                }

                tc.push(treatmentCitation)
            }
        }
        return tc;
    },

    parseFigureCitations: function(figcit) {
        const fc = [];
        if (figcit.length) {
            for (let i = 0, j = figcit.length; i < j; i++) {
                let figureCitation = {};
                
                dataDict.figureCitations.forEach(el => {
                    figureCitation[el["Plazi Field"]] = figcit[i].attribs[el["Plazi Field"]];
                })

                fc.push(figureCitation)
            }
        }
        return fc;
    },

    parseTreatmentAuthors: function($) {
        const treaut = $('mods\\:namePart');
        const ta = [];
        if (treaut.length) {
            for (let i = 0, j = treaut.length; i < j; i++) {
                ta.push(treaut[i].children[0].data)
            }
        }
        return ta;
    },

    cheerioparse: function(xml, treatment_id) {
        
        let treatment = {};
        treatment['treatment_id'] = treatment_id;

        const $ = cheerio.load(xml, {
            normalizeWhitespace: true,
            xmlMode: true
        });

        dataDict.treatments.forEach(el => {
            if (el["Plazi Field"] === 'treatmentAuthors') {
                treatment[el["Plazi Field"]] = this.parseTreatmentAuthors($)
            }
            else {
                treatment[el["Plazi Field"]] = eval(el["tag"]);
            }
            
        })

        treatment['materialCitations'] = this.parseMaterialCitations($('materialsCitation'));
        treatment['treamentCitations'] = this.parseTreatmentCitations($);
        treatment['figureCitations'] = this.parseFigureCitations($('figureCitations'));

        return treatment;
        
    }
};

module.exports = parsex;
