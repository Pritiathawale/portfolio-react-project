const nodemailer = require('nodemailer');
const sendinblueTransport = require('nodemailer-sendinblue-transport');
const sibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = sibApiV3Sdk.ApiClient.instance;

// Transport configuration

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
// const transporter = nodemailer.createTransport(
//     sendinblueTransport({
//         auth: {
//             apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
//         }
//     })
// );

const sendEmailController = (req, res) => {
    try {
        const { name, email, msg } = req.body;

        if (!name || !email || !msg) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            });
        }

        transporter.sendMail({
            to: 'pritiathawale222@gmail.com',
            from: 'athawalepriti21@gmail.com',
            subject: 'Regarding Mern Portfolio App',
            html: `
              <h5>Detail Information</h5>
              <ul>
                <li><p>Name: ${name}</p></li>
                <li><p>Email: ${email}</p></li>
                <li><p>Message: ${msg}</p></li>
              </ul>
            `
        }, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send({
                    success: false,
                    message: 'Send Email API Error',
                    error
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Your message was sent successfully',
                });
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Send Email API Error',
            error
        });
    }
};

module.exports = { sendEmailController };
