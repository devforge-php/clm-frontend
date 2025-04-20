import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      profileStatistics:'Profile Statistics',
      socialMediaLinks:"Social Media Links",
      member:"Member",
      vazifahaliberilmagan:"Task not assigned yet!",
      yuklanmoqda:"Loading...",
      xatolikberdi:"An error occurred:",
      adminVazifalari:"Admin Tasks",
      adminIzohi:"Comment",
      getAdmin:"Get in touch with the admin",
      adminCommnetDocs:"After subscribing to the given links, send the ID and code provided by the admin.",
        // sidebar  
       dashboard: "Dashboard",
       sidebarAccounts: "All Social Accounts",
       referralGet:"Referral Get",
       referralPost:"Referral Post",
       userTask: "User Task",
       payment:"Payment",
       newTask:"New Task",
       allUsers:"All Users",
       docs:"Documentation",
       // sidebar  
      // AvatarMenu 
       MyProfile:"My Profile",
       EditProfile: "Edit Profile",
       ProfileImage: "Profile Image",
       SignOut: "Sign Out",
       DeleteAccount: "Delete Account",
        // AvatarMenu 
        // UserTaskCard
        userContact: "User Contact",
        userTaskContact:"Agar biror savolingiz bo‘lsa, admin bilan bog‘laning.",
         userTaskcardbutton:"Read more",
        // UserTaskCard
        // docs
        documentation: "Documentation",
        showLess:"Show Less",
        showMore:"Show More",
        docsText:"Welcome to the CLM (Customer Loyalty Management) platform! This platform allows you to complete tasks, earn tokens, invite friends via referral links, and manage your profile. To start using the platform, you must first register. Click the Register button above and enter your email and password. Once you successfully register, you will be logged in automatically If you already have an account, click Login and enter your email and password to access the system. After successful login, you will be redirected to the Dashboard page, where a list of available tasks will be shown. Each task includes a social media link that you need to interact with—such as liking, commenting, or subscribing. After completing the task, return to the platform and click the Completed button.The CLM platform also includes a referral system. Go to the Referral Post section and copy your unique referral link. Share it with your friends. If they register through your link, you will receive tokens as a reward. Tokens are earned by completing tasks and inviting users. These tokens can be used for payments or other features (if available). You can track your token balance and payment history from the Payment section.In the profile section, you can view and edit your personal information. Use Edit Profile to change your name, email, and other data. Through the Profile Image section, you can upload a picture for your profile. If you have any issues or questions, feel free to contact the admin or send an email to: support@clm.uz To make the most out of the CLM platform, simply follow the instructions above. Good luck!",
        // auth
        login:"Login",
        register: "Register",
         //  PaymentModal
         wouldyoulike:"Do you really want to make a payment to receive the coin?",
         otmen:"Cancel",
         willpay:"Yes, I will pay",
    }
  },
  ru: {
    translation: {
      profileStatistics:'Профильная статистика',
      socialMediaLinks:"Ссылки на социальные сети",
      member:"Участник",
      vazifahaliberilmagan:"Задача еще не назначена!",
      yuklanmoqda:"Загрузка...",
      xatolikberdi:"Произошла ошибка:",
      adminVazifalari:"Задачи администратора",
      adminIzohi:"Комментарий",
      getAdmin:"Свяжитесь с администратором",
      adminCommnetDocs:"После подписки на указанные ссылки отправьте ID и код, предоставленные администратором.",
        // sidebar  
       dashboard: "Главная",
       sidebarAccounts: "Все  аккаунты",
       referralGet:"Получить реферал",
       referralPost:"Отправить реферал",
       userTask: "Задача пользователя",
       payment:"платеж",
       newTask:"Новая задача",
       allUsers:"Все пользователи",
       docs:"Документация",
       // sidebar
       // AvatarMenu   
       MyProfile:"Мой профиль",  
       EditProfile: "Редактировать профиль",
       ProfileImage: "Изображение профиля",
       SignOut: "Выйти",
       DeleteAccount: "Удалить аккаунт",
      // AvatarMenu 
      // UserTaskCard
      userContact: "Связаться с администратором",
      userTaskContact:"Если у вас есть вопросы, свяжитесь с администратором.",
      userTaskcardbutton:"Читать далее",
      // UserTaskCard
       // docs
       documentation: "Документация",
       showLess:"Показать меньше",
       showMore:"Показать больше",
       docsText:"Добро пожаловать на платформу CLM (Customer Loyalty Management)! Эта платформа позволяет выполнять задания, зарабатывать токены, приглашать друзей по реферальной ссылке и управлять своим профилем. Чтобы начать пользоваться платформой, необходимо сначала зарегистрироваться. Нажмите кнопку «Register» вверху и введите свой email и пароль. После успешной регистрации вы автоматически войдёте в систему.Если у вас уже есть аккаунт, нажмите «Login» и введите свои данные для входа. После успешного входа вы будете перенаправлены на страницу «Dashboard», где отображается список доступных заданий. Каждое задание содержит ссылку на социальную сеть, с которой нужно взаимодействовать — поставить лайк, оставить комментарий или подписаться. После выполнения задания вернитесь на платформу и нажмите кнопку «Выполнено».На платформе CLM также реализована реферальная система. Перейдите в раздел «Referral Post» и скопируйте вашу индивидуальную реферальную ссылку. Поделитесь ею с друзьями. Если они зарегистрируются по вашей ссылке, вы получите вознаграждение в виде токенов. Токены начисляются за выполнение заданий и приглашение новых пользователей. Их можно использовать для платежей или других функций (если они активны). Проверить баланс токенов и историю платежей можно в разделе «Payment».В разделе профиля вы можете просматривать и редактировать свою личную информацию. Через «Edit Profile» можно изменить имя, email и другие данные. В разделе «Profile Image» можно загрузить фотографию для профиля. Если у вас возникнут вопросы или проблемы, свяжитесь с админом или напишите на почту: support@clm.uz Чтобы максимально эффективно использовать платформу CLM, просто следуйте вышеуказанной инструкции. Удачи!",
         // auth
         login:"Вход",
         register: "Регистрация",
        //  PaymentModal
        wouldyoulike:"Вы действительно хотите произвести оплату, чтобы получить монету?",
        otmen:"Отменить",
        willpay:"Да, я заплачу",

    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Standart til
  fallbackLng: "en", // Agar til topilmasa, qaysi tilga qaytish
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
