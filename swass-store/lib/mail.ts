import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@nourdine-jazi.tn",
    to: email,
    subject: "Reset your password",
    html: `
    <p>Cher(e) utilisateur,</p>

    <p>Si vous avez oublié votre mot de passe, ne vous inquiétez pas! Nous sommes là pour vous aider à le réinitialiser. Cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe sécurisé:</p>
    <a href="${resetLink}">Réinitialiser mon mot de passe</a>

    <p>Si vous n'avez pas demandé la réinitialisation de votre mot de passe, veuillez ignorer cet e-mail.</p>

    <p>Restez actif et en bonne santé!</p>

    <p>Cordialement,<br>Swass Fashion</p>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "nourdine <www@nourdine-jazi.tn>",
    to: email,
    subject: "Confirm your email",
    html: `
    <p>Cher(e) utilisateur,</p>
    
    <p>Nous sommes ravis de vous accueillir au sein du SWASS FASHION! Pour garantir la sécurité de votre compte, veuillez suivre les étapes ci-dessous pour vérifier votre adresse e-mail.</p>

    <p>Cliquez sur le lien ci-dessous pour confirmer votre adresse e-mail:</p>
    <a href="${confirmLink}">Vérifier mon adresse e-mail</a>

    <p>Si vous n'avez pas récemment créé de compte sur le site du SWASS FASHION, veuillez ignorer cet e-mail.</p>

    <p>Merci de faire partie de notre communauté!</p>

    <p>Cordialement,<br>L'équipe du SWASS FASHION</p>
    `,
  });
};
