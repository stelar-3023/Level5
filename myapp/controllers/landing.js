const models = require('../models');

exports.get_landing = function (req, res, next) {
  res.render('landing', { title: 'Express' });
};
exports.submit_lead = function (req, res, next) {
  // res.render('landing', { title: 'Express' });
  // console.log("lead email:", req.body.lead_email)
  return models.Lead.create({
    email: req.body.lead_email,
  }).then((lead) => {
    res.redirect('/leads');
  });
};

exports.show_leads = function (req, res, next) {
  return models.Lead.findAll().then((leads) => {
    res.render('landing', { title: 'Express', leads: leads });
  });
};

exports.show_lead = function (req, res, next) {
  return models.Lead.findOne({
    where: {
      id: req.params.lead_id,
    },
  }).then((lead) => {
    res.render('lead', { lead: lead });
  });
};

exports.show_edit_lead = function (req, res, next) {
  return models.Lead.findOne({
    where: {
      id: req.params.lead_id,
    },
  }).then((lead) => {
    res.render('lead/edit_lead', { lead: lead });
  });
};

exports.edit_lead = function (req, res, next) {
  // req.params.lead_id;
  // req.body.lead_email;

  return models.Lead.update(
    {
      email: req.body.lead_email,
    },
    {
      where: {
        id: req.params.lead_id,
      },
    }
  ).then((lead) => {
    res.redirect('/lead/' + req.params.lead_id);
  });
};
