import { CronJob } from "cron";
import * as nodemailer from "nodemailer"

class ReminderService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
    }

    sendEmail({email, date, shop, handle}, job) {
        const [YEAR, MONTH, DAY] = date.split('-');
        this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Reminder on ${date}`,
            text: '',
            html:
                `
                    <div>
                        Reminder to return for product.
                    </div>

                    <a href="https://${shop}/products/${handle}">https://${shop}/products/${handle}</a>
                `
        });
        job.stop();
        return;
    }

    setReminder({email, date, shop, handle}) {
        const [YEAR, MONTH, DAY] = date.split('-');
        let job = new CronJob(`* * * ${DAY} ${MONTH} *`, () => this.sendEmail({email, date, shop, handle}, job), null, true);
    }
}

export default new ReminderService();