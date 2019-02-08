'use strict';

const Debug = require('debug')('parsex');
const cheerio = require('cheerio');
const dataDict = require('./data-dictionary');

const parsex = {

    parseMaterialCitations: function($) {
        const matcit = $('subSubSection[type=materials_examined] materialsCitation');
        const mc = [];
        if (matcit.length) {
            for (let i = 0, j = matcit.length; i < j; i++) {
                let materialCitation = {};
                
                dataDict.materialCitations.forEach(el => {
                    if (matcit[i].attribs[el["plazi"]]) {
                        materialCitation[el["plazi"]] = matcit[i].attribs[el["plazi"]];
                    }                    
                })

                if (Object.keys(materialCitation).length) {
                    mc.push(materialCitation)
                }
            }
        }
        return mc;
    },

    parseTreatmentCitations: function($) {

        const tc = [];

        const trecitgroups = $('subSubSection[type=reference_group] treatmentCitationGroup');
        if (trecitgroups.length) {
            
            for (let i = 0, j = trecitgroups.length; i < j; i++) {
                const trecitgroup = $(trecitgroups[i]);
                let treatmentCitationText;

                const taxonomicName = $('taxonomicName', trecitgroup);

                if (taxonomicName) {
                    treatmentCitationText = taxonomicName[0].children[0].data;
                    if (taxonomicName.attr('authority')) {
                        treatmentCitationText += ' ' + taxonomicName.attr('authority')
                    }
                }
                
                const treatmentCitations = $('treatmentCitation', taxonomicName);
                if (treatmentCitations.length) {
                    for (let k = 0, l = treatmentCitations.length; k < l; k++) {
                        const bib = $('bibRefCitation', treatmentCitations[k]).text();
                        if (bib) {
                            treatmentCitationText += ' sec. ' + bib
                        }

                        let refString = $('bibRefCitation', treatmentCitations[k]).attr('refString');

                        tc.push({
                            treatmentCitationText: treatmentCitationText,
                            refString: refString
                        })
                    }
                }
            }
        }
        return tc;
    },

    parseFigureCitations: function($) {
        const figcit = $('figureCitation');
        const fc = [];
        if (figcit.length) {
            for (let i = 0, j = figcit.length; i < j; i++) {
                let figureCitation = {};
                
                dataDict.figureCitations.forEach(el => {
                    figureCitation[el["plazi"]] = figcit[i].attribs[el["plazi"]];
                })

                fc.push(figureCitation)
            }
        }
        return fc;
    },

    parseBibRefCitations: function($) {
        const bibcit = $('bibRefCitation');
        const bc = [];
        if (bibcit.length) {
            for (let i = 0, j = bibcit.length; i < j; i++) {
                
                dataDict.bibRefCitations.forEach(el => {
                    bc.push(bibcit[i].attribs[el["plazi"]])
                })
            }
        }
        return bc;
    },

    parseTreatmentAuthors: function($) {
        const treaut = $('mods\\:mods mods\\:name[type=personal]');
        const ta = [];
        if (treaut.length) {
            for (let i = 0, j = treaut.length; i < j; i++) {
                const role = $('mods\\:role mods\\:roleTerm', treaut[i]).text();
                if (role === 'Author') {
                    ta.push($('mods\\:namePart', treaut[i]).text())
                }
            }
        }
        return ta;
    },

    parseTreament: function($) {

        let treatment = {};

        dataDict.treatments.forEach(el => {
            let val = eval(el["element"]);
            if (typeof val !== 'undefined') {
                treatment[el["plazi"]] = val.trim();
            }
            else {
                treatment[el["plazi"]] = ''
            }
        })

        return treatment
    },

    cheerioparse: function(xml, treatment_id) {
        
            
            const $ = cheerio.load(xml, {
                normalizeWhitespace: true,
                xmlMode: true
            });

            let treatment = this.parseTreament($)
            treatment['treatmentAuthors'] = this.parseTreatmentAuthors($);
            treatment['materialCitations'] = this.parseMaterialCitations($);
            treatment['treamentCitations'] = this.parseTreatmentCitations($);
            treatment['figureCitations'] = this.parseFigureCitations($);
            treatment['bibRefCitations'] = this.parseBibRefCitations($);

            return treatment;
            
        
    }
};

module.exports = parsex;
