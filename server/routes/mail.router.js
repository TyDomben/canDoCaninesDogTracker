const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../../.env.js");
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
    //userEmail should = something like req.user.email or something like that, will have to sort out after getting something to call this on the page
  const { userEmail } = req.body;
  //This is used to identify the logged in user
  //const user = req.user;
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
      name: "Puppy Program Team",
      link: "https://candocanines.org/",
    },
  });
  //This is where we make the actual body of the email, i.e. what the user will see when reading the email
  let response = {
    body: {
        //This will hopefully target the logged in user and populate their name in the email
        //name: user.name,
      name: "jswanson97",
      intro:
        [`Hello (Host Name)`, `You have been confirmed for a host assignement for (Dog Name)!`, `Please log into the host opportunities site to review the details fot the opportunity. You will be connected with the current host home via email to arrange a handoff.`, `Please contact puppyprogram@candocanines.org if you have any questions or if anything changes`],
      signature: "Thank you for all you do",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Dog Watch Confirmation",
    html: mail,
  };
  transporter.sendMail(message).then(() => {
    return res
      .status(201)
      .json({
        msg: "you should receive an email",
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });
  });
});

router.post("/denial", async (req, res) => {
    //userEmail should = something like req.user.email or something like that, will have to sort out after getting something to call this on the page
  const { userEmail } = req.body;
  //This is used to identify the logged in user
  //const user = req.user;
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
        //This will hopefully target the logged in user and populate their name in the email
        //name: user.name,
      name: "jswanson97",
      intro:
        "Were sorry to inform you that the request you have made is no longer needed.",
      signature: "Thank you for volunteering",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Dog Watch Denial",
    html: mail,
  };
  transporter.sendMail(message).then(() => {
    return res
      .status(201)
      .json({
        msg: "you should receive an email",
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });
  });
});

router.post("/request", async (req, res) => {
    //This email is going out to everyone on the "distro list"
  const { userEmail } = req.body;
  //This is used to identify the logged in user
  //const user = req.user;
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
        //This will hopefully target the logged in user and populate their name in the email
        //name: user.name,
      name: "Everyone",
      intro:
        "Hello volunteers, this email is going out to everyone as a notice that (dogs name) needs a host for dates (start date) through (end date)",
      signature: "Thank you",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: EMAIL,
    //Reminder that userEmail should be replaced with whatever is needed for this to go out to everyone
    to: userEmail,
    subject: "Dog Watch Confirmation",
    html: mail,
  };
  transporter.sendMail(message).then(() => {
    return res
      .status(201)
      .json({
        msg: "you should receive an email",
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });
  });
});

module.exports = router;
