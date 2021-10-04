"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.erroneousController = erroneousController;
exports.successfulController = successfulController;
exports.switchController = switchController;

var _helpers = require("../helpers");

var errorList = ['E010004', 'E010006', 'E010007', 'E010008', 'E010009', 'E010011', 'E010012', 'E010013', 'E010014', 'E010015'];

function erroneousController(req, res) {
  res.sendFile("".concat(req.errorCode, ".xml"), {
    root: './responses'
  });
}

function successfulController(req, res) {
  var _req$query = req.query,
      nom = _req$query.nom,
      prenoms = _req$query.prenoms,
      dateNaissance = _req$query.dateNaissance,
      sexe = _req$query.sexe,
      codeLieuNaissance = _req$query.codeLieuNaissance;
  var xml = "\n  <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n  <el:IdentificationsIndividusCitoyens\n    xmlns:n1=\"http://www.altova.com/samplexml/other-namespace\"\n    xmlns:ds=\"http://www.w3.org/2000/09/xmldsig\"\n    xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n    xmlns:io=\"http://xml.insee.fr/schema/outils\"\n    xmlns:ie=\"http://xml.insee.fr/schema\"\n    xmlns:ec=\"http://xml.insee.fr/schema/etat-civil\"\n    xmlns:el=\"http://xml.insee.fr/schema/electoral\"\n    xsi:schemaLocation=\"http://xml.insee.fr/schema/electoral http://xml.insee.fr/schema/electoral/brpp-client-identification.xsd\"\n    uriDemande=\"http://identification-etat-civil.insee.net/individus?rechercheType=S&amp;nom=ong&amp;prenoms=william&amp;dateNaissance=19870729&amp;sexe=m&amp;codeLieuNaissance=93051\"\n    dateValidite=\"2015-04-16\"\n  >\n    <el:TypeReponseIdentification>".concat(req.status, "</el:TypeReponseIdentification>\n    <el:IdentificationIndividuCitoyen>\n      <el:SituationActuelle>\n        <ec:Individu>\n          <ie:Noms>\n            <ie:NomFamille>").concat(nom, "</ie:NomFamille>\n          </ie:Noms>\n          <ie:Prenoms>\n            <ie:Prenom>").concat(prenoms, "</ie:Prenom>\n          </ie:Prenoms>\n          <ie:Naissance>\n            <ie:DateNaissance>").concat((0, _helpers.formatDate)(dateNaissance), "</ie:DateNaissance>\n              <ie:LieuNaissance>\n                <ie:Localite code=\"").concat(codeLieuNaissance, "\">Noisy-le-Grand</ie:Localite>\n              </ie:LieuNaissance>\n              <ie:NumeroActeNaissance>614</ie:NumeroActeNaissance>\n            </ie:Naissance>\n            <ie:Sexe>").concat(sexe, "</ie:Sexe>\n          </ec:Individu>\n          <ec:QualiteEtatCivil>ci</ec:QualiteEtatCivil>\n        </el:SituationActuelle>\n        <el:StatutDuNomIdentifieDansLaDemande>O</el:StatutDuNomIdentifieDansLaDemande>\n        <el:Divergences>\n          <ec:DivergenceNom>false</ec:DivergenceNom>\n          <ec:DivergencePrenoms>false</ec:DivergencePrenoms>\n          <ec:DivergenceSexe>false</ec:DivergenceSexe>\n          <ec:DivergenceDateNaissance>false</ec:DivergenceDateNaissance>\n          <ec:DivergenceLieuNaissance>false</ec:DivergenceLieuNaissance>\n          <ec:DivergenceNIR>false</ec:DivergenceNIR>\n        </el:Divergences>\n      </el:IdentificationIndividuCitoyen>\n    </el:IdentificationsIndividusCitoyens>\n  ");
  res.setHeader('content-type', 'text/xml');
  res.send(xml);
}

function switchController(req, res, next) {
  var errorCode = (0, _helpers.getErrorCode)(req, errorList); // eslint-disable-next-line no-console

  console.log("[INFO] Found errorCode ".concat(errorCode));

  switch (errorCode) {
    case false:
      req.status = 2;
      return successfulController(req, res);

    case 'E010007':
      req.status = 7;
      return successfulController(req, res);

    case 'E010011':
      // We want to trigger a timeout error on FC (6 seconds)
      return setTimeout(next, 7000);

    default:
      req.errorCode = errorCode;
      return erroneousController(req, res);
  }
}