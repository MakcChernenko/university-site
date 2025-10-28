"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./questionnaire.module.css";

interface FormValues {
  gender: string;
  age: string;
  marital: string;
  location: string;
  job: string;
  income: string;
  purpose: string;
  experience: string;
  priority: string;
  source: string;
  feedback: string;
}

export default function QuestionnairePage() {
  const [profile, setProfile] = useState<FormValues | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initialValues: FormValues = {
    gender: "",
    age: "",
    marital: "",
    location: "",
    job: "",
    income: "",
    purpose: "",
    experience: "",
    priority: "",
    source: "",
    feedback: "",
  };

  const validationSchema = Yup.object({
    gender: Yup.string().required("Обов’язкове поле"),
    age: Yup.string().required("Обов’язкове поле"),
    purpose: Yup.string().required("Обов’язкове поле"),
  });

  const handleSubmit = (values: FormValues) => {
    setProfile(values);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <h1 className={styles.title}>
          Анкета відвідувача Похоронного дому Волдеморт
        </h1>
        <p className={styles.subtitle}>
          Ми прагнемо зробити наш сервіс людяним і уважним. Заповніть, будь
          ласка, анкету.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label>
            Стать:
            <Field as="select" name="gender">
              <option value="">— Оберіть —</option>
              <option value="Чоловіча">Чоловіча</option>
              <option value="Жіноча">Жіноча</option>
              <option value="Інше">Інше</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              className={styles.error}
            />
          </label>

          <label>
            Вік:
            <Field as="select" name="age">
              <option value="">— Оберіть —</option>
              <option value="до 25">до 25</option>
              <option value="26–40">26–40</option>
              <option value="41–60">41–60</option>
              <option value="понад 60">понад 60</option>
            </Field>
            <ErrorMessage name="age" component="div" className={styles.error} />
          </label>

          <label>
            Сімейний стан:
            <Field as="select" name="marital">
              <option value="">— Оберіть —</option>
              <option value="Одружений/Заміжня">Одружений / Заміжня</option>
              <option value="Неодружений/Незаміжня">
                Неодружений / Незаміжня
              </option>
              <option value="Вдівець/Вдова">Вдівець / Вдова</option>
            </Field>
          </label>

          <label>
            Місце проживання:
            <Field as="select" name="location">
              <option value="">— Оберіть —</option>
              <option value="Місто">Місто</option>
              <option value="Село">Село</option>
            </Field>
          </label>

          <label>
            Сфера діяльності:
            <Field as="select" name="job">
              <option value="">— Оберіть —</option>
              <option value="Державний сектор">Державний сектор</option>
              <option value="Приватний сектор">Приватний сектор</option>
              <option value="Пенсіонер">Пенсіонер</option>
              <option value="Інше">Інше</option>
            </Field>
          </label>

          <label>
            Рівень доходу:
            <Field as="select" name="income">
              <option value="">— Оберіть —</option>
              <option value="Низький">Низький</option>
              <option value="Середній">Середній</option>
              <option value="Високий">Високий</option>
            </Field>
          </label>

          <label>
            Мета відвідування сайту:
            <Field as="select" name="purpose">
              <option value="">— Оберіть —</option>
              <option value="Пошук інформації">Пошук інформації</option>
              <option value="Підбір послуг">Підбір послуг</option>
              <option value="Консультація">Консультація</option>
            </Field>
            <ErrorMessage
              name="purpose"
              component="div"
              className={styles.error}
            />
          </label>

          <label>
            Досвід користування ритуальними послугами:
            <Field as="select" name="experience">
              <option value="">— Оберіть —</option>
              <option value="Так">Так</option>
              <option value="Ні">Ні</option>
            </Field>
          </label>

          <label>
            Що для вас найважливіше:
            <Field as="select" name="priority">
              <option value="">— Оберіть —</option>
              <option value="Ціна">Ціна</option>
              <option value="Репутація">Репутація</option>
              <option value="Швидкість">Швидкість</option>
              <option value="Людяність персоналу">Людяність персоналу</option>
            </Field>
          </label>

          <label>
            Як ви нас знайшли:
            <Field as="select" name="source">
              <option value="">— Оберіть —</option>
              <option value="Google">Google</option>
              <option value="Соцмережі">Соцмережі</option>
              <option value="Рекомендація">Рекомендація</option>
            </Field>
          </label>

          <label>
            Що ми могли б покращити:
            <Field
              as="textarea"
              name="feedback"
              placeholder="Ваш коментар..."
            />
          </label>

          <button type="submit" className={styles.button}>
            Надіслати анкету
          </button>
        </Form>
      </Formik>

      {profile && (
        <div className={styles.profileCard}>
          <h2>🕯 Портрет споживача</h2>
          <p>
            <b>Стать:</b> {profile.gender}
          </p>
          <p>
            <b>Вік:</b> {profile.age}
          </p>
          <p>
            <b>Сімейний стан:</b> {profile.marital}
          </p>
          <p>
            <b>Місце проживання:</b> {profile.location}
          </p>
          <p>
            <b>Сфера діяльності:</b> {profile.job}
          </p>
          <p>
            <b>Рівень доходу:</b> {profile.income}
          </p>
          <p>
            <b>Мета візиту:</b> {profile.purpose}
          </p>
          <p>
            <b>Досвід:</b> {profile.experience}
          </p>
          <p>
            <b>Пріоритет:</b> {profile.priority}
          </p>
          <p>
            <b>Джерело:</b> {profile.source}
          </p>
          <p>
            <b>Коментар:</b> {profile.feedback}
          </p>
        </div>
      )}
    </div>
  );
}
