module.exports = {
    treatments: [
        //{"Plazi Field": "treatmentId", "Zenodo Field": "", "type": "string", "tag": "UUID","definition": "The unique ID of the treatment"},
        {"Plazi Field": "treatmentTitle", "Zenodo Field": "title", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').text() + ' ' + $('subSubSection[type=nomenclature] taxonomicName').attr('authority')","definition": "Title of the treatment. If it is a new species, a taxonomicNameLabel will be present, and is concatenated to the taxonomicName, which is concatenated to the authority attribute"},
        {"Plazi Field": "pages", "Zenodo Field": "pages", "type": "string", "tag": "$('treatment').attr('pageNumber') + '–' + $('treatment').attr('lastPageNumber')","definition": "'from' and 'to' pages where the treatment occurs in the article"},
        {"Plazi Field": "doi", "Zenodo Field": "relatedidentifiers[isPartOf]", "type": "string", "tag": "$('mods\\\\:identifier[type=DOI]').text()","definition": "DOI of journal article"},
        {"Plazi Field": "zenodoDep", "Zenodo Field": "relatedidentifiers[isPartOf]", "type": "string", "tag": "$('mods\\\\:identifier[type=Zenodo-Dep]').text()","definition": "Zenodo record of journal article"},
        {"Plazi Field": "treatmentAuthors", "Zenodo Field": "creators", "type": "array of strings", "tag": "$('mods\\\\:namePart')","definition": "Authors of article (used if no treatment authority is found)"},
        {"Plazi Field": "publicationDate", "Zenodo Field": "publicationDate", "type": "date", "tag": "$('mods\\\\:detail[type=pubDate] mods\\\\:number').text()","definition": "The date of the publication of the article. If a complete date is not available (for example, if only the year is available), then the last day of the year is used."},
        {"Plazi Field": "journalTitle", "Zenodo Field": "journal_title", "type": "string", "tag": "$('mods\\\\:titleInfo').text()","definition": "Title of the journal"},
        {"Plazi Field": "journalYear", "Zenodo Field": "journal_year", "type": "string", "tag": "$('mods\\\\:part mods\\\\:date').text()","definition": "Year of the journal"},
        {"Plazi Field": "journalVolume", "Zenodo Field": "journal_volume", "type": "string", "tag": "$('mods\\\\:relatedItem[type=host] mods\\\\:part mods\\\\:detail[type=volume] mods\\\\:number').text()","definition": "Volume of the journal"},
        {"Plazi Field": "journalIssue", "Zenodo Field": "journal_issue", "type": "string", "tag": "$('mods\\\\:detail[type=issue]').text()","definition": "Issue of the journal"},
        {"Plazi Field": "authorityName", "Zenodo Field": "creators: this should be subject: scientificName authority: dwc http://rs.tdwg.org/dwc/terms/scientificNameAuthorship", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('authorityName')","definition": "The name of the author(s) of the taxon (not necessarily the same as the authors of the journal article, but ommited if same as article authors)"},
        {"Plazi Field": "authorityYear", "Zenodo Field": "-", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('authorityYear')","definition": "The year when the taxon name has been published"},
        {"Plazi Field": "kingdom", "Zenodo Field": "keywords AND also subject  ", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('kingdom')","definition": "Higher category of the taxonomicName"},
        {"Plazi Field": "phylum", "Zenodo Field": "keywords AND also subject", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('phylum')","definition": "Higher category of the taxonomicName"},
        {"Plazi Field": "order", "Zenodo Field": "keywords AND also subject", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('order')","definition": "Higher category of the taxonomicName"},
        {"Plazi Field": "family", "Zenodo Field": "keywords AND also subject", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('family')","definition": "Higher category of the taxonomicName"},
        {"Plazi Field": "genus", "Zenodo Field": "keywords AND also subject", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('genus')","definition": "Higher category of the taxonomicName"},
        {"Plazi Field": "species", "Zenodo Field": "keywords AND also subject", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('species')","definition": "The specific epithet of a Latin Binomen"},
        {"Plazi Field": "status", "Zenodo Field": "keywords", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('status')","definition": "Descriptor for the taxonomic status of the taxon, such as new species, new genus, new combination, etc."},
        {"Plazi Field": "rank", "Zenodo Field": "keywords", "type": "string", "tag": "$('subSubSection[type=nomenclature] taxonomicName').attr('rank')","definition": "The taxonomic rank of the taxon, e.g. species, family,"}
    ],
    materialCitations: [
        {"Plazi Field": "collectionCode", "Zenodo Field": "subjects", "type": "string", "tag": "$('materialsCitation').attr('collectionCode')","definition": "The collection code for a natural history collection"},
        {"Plazi Field": "specimenCountFemale", "Zenodo Field": "-", "type": "string", "tag": "$('materialsCitation').attr('specimenCount-female')","definition": "The number of female specimens listed"},
        {"Plazi Field": "specimenCountMale", "Zenodo Field": "-", "type": "string", "tag": "$('materialsCitation').attr('specimenCount-male')","definition": "The number of male specimens listed"},
        {"Plazi Field": "specimenCount", "Zenodo Field": "-", "type": "string", "tag": "$('materialsCitation').attr('specimenCount')","definition": "The number of specimens listed"},
        {"Plazi Field": "specimenCode", "Zenodo Field": "subjects", "type": "string", "tag": "$('materialsCitation').attr('specimenCode')","definition": "The code for specimen"},
        {"Plazi Field": "typeStatus", "Zenodo Field": "subjects", "type": "string", "tag": "$('materialsCitation').attr('typeStatus')","definition": "The nomenclatural status of the specimen, e.g. holotype, paratype"},
        {"Plazi Field": "collectingCountry", "Zenodo Field": "geo_place", "type": "string", "tag": "$('materialsCitation').attr('collectingCountry')","definition": "Country where the specimen has been collected"},
        {"Plazi Field": "collectingRegion", "Zenodo Field": "geo_place", "type": "string", "tag": "$('materialsCitation').attr('collectingRegion')","definition": "The geographic region where the specimen as been collected"},
        {"Plazi Field": "collectingMunicipality", "Zenodo Field": "geo_place", "type": "string", "tag": "$('materialsCitation').attr('collectingMunicipality')","definition": "A lower administrative region"},
        {"Plazi Field": "collectingCounty", "Zenodo Field": "geo_place", "type": "string", "tag": "$('materialsCitation').attr('collectingCounty')","definition": "A less lower administrative region"},
        {"Plazi Field": "location", "Zenodo Field": "geo_place", "type": "string", "tag": "$('materialsCitation').attr('location')","definition": "The collecting location"},
        {"Plazi Field": "locationDeviation", "Zenodo Field": "geo_place", "type": "string", "tag": "$('materialsCitation').attr('locationDeviation')","definition": "Distance to the nearest location, e.g. 23km NW from..."},
        {"Plazi Field": "determinerName", "Zenodo Field": "-", "type": "string", "tag": "$('materialsCitation').attr('determinerName')","definition": "Person or agent who identified the specimen"},
        {"Plazi Field": "collectorName", "Zenodo Field": "contributor=collector", "type": "string", "tag": "$('materialsCitation').attr('collectorName')","definition": "Person who collected the specimen"},
        {"Plazi Field": "collectingDate", "Zenodo Field": "date[type=collected] + range parsing", "type": "string", "tag": "$('materialsCitation').attr('collectingDate')","definition": "The data when the specimen has been collected"},
        {"Plazi Field": "collectedFrom", "Zenodo Field": "-", "type": "string", "tag": "$('materialsCitation').attr('collectedFrom')","definition": "The substrate where the specimen has been collected, e.g. leaf, flower"},
        {"Plazi Field": "collectingMethod", "Zenodo Field": "description[method]", "type": "string", "tag": "$('materialsCitation').attr('collectingMethod')","definition": "The method used to collect the specimen"},
        {"Plazi Field": "latitude", "Zenodo Field": "geo_lat", "type": "real", "tag": "$('materialsCitation').attr('latitude')","definition": "Geographic coordinates where the specimen has been collected"},
        {"Plazi Field": "longitude", "Zenodo Field": "geo_lon", "type": "real", "tag": "$('materialsCitation').attr('longitude')","definition": "Geographic coordinates where the specimen has been collected"},
        {"Plazi Field": "elevation", "Zenodo Field": "-", "type": "string", "tag": "$('materialsCitation').attr('elevation')","definition": "The elevation where the specimen has been collected"},
        {"Plazi Field": "httpUri", "Zenodo Field": "relatedIdentifiers[hasPart]", "type": "string", "tag": "$('materialsCitation').attr('httpUri')","definition": "The persistent identifier of the specimen"}
    ],
    treatmentCitations: [
        {"Plazi Field": "treatmentCitation", "Zenodo Field": "relatedIdentifiers[cites]", "type": "", "tag": "$('treatmentCitation').text()","definition": "The taxonomic name and the author of the treatments cited by this treatment"},
        {"Plazi Field": "refString", "Zenodo Field": "references", "type": "", "tag": "$('treatmentCitation bibRefCitation').attr('refString')","definition": "The bibliographic reference string of the treatments cited by this treatment"}
    ],
    figureCitations: [
        {"Plazi Field": "figureCitation", "Zenodo Field": "relatedIdentifiers[cites]", "type": "", "tag": "$('figureCitation').attr('httpUri')","definition": "The figures cited by this treatment"}
    ]
};