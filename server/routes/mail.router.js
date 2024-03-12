const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../../.env");
const Mailgen = require("mailgen");

//This is a test emai function that sends an email to a fake randomly generated email and sends a link to ethereal email to view it
router.post("/testemail", async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let message = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should have gotten an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      return res.status(500).json({ err });
    });

  // res.status(201).json("Signup Successfull")
});

router.post("/confirmation", async (req, res) => {
    const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
    //EMAIL and PASSWORD are refenced in a .env file so you will have to make your own, this is for who is SENDING the email
      user: EMAIL,
      pass: PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);

  //This is what populates the Header and the Footer, think of this as "what company is this coming from"
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Can Do Canines",
      link: "https://candocanines.org/",
    },
  });
  //This is where we make the actual body of the email, i.e. what the user will see when reading the email
  let response = {
    body: {
      name: "jswanson97",
      intro:
        "Confirmation email to watch (dogs name) for dates (start date) through (end date)",
      signature: "Thank you for volunteering",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Dog Watch Confirmation",
    html: mail
  }
  transporter.sendMail(message).then(() => {
    return res.status(201).json({
        msg: "you should receive an email"
    }).catch(err => {
        return res.status(500).json({ err })
    })
  })
});

module.exports = router;
