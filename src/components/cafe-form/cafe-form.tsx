import { ErrorMessage, Field, Form, Formik } from "formik";
import style from "./cafe-form.module.scss";
import * as Yup from "yup";
import { doc, GeoPoint, setDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import { FC, useState } from "react";
import { patrickHand400 } from "@/src/fonts/fonts";
import { CafeFuncPropsType } from "@/src/components/cafe-form/cafe-form-wrapper";
import { FormikState } from "formik/dist/types";

type valuesType = {
  name: string;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  rating: string;
  rating_google: string;
  rating_ta: string;
};
const initialValues: valuesType = {
  name: "",
  city: "",
  address: "",
  latitude: "",
  longitude: "",
  rating: "",
  rating_google: "",
  rating_ta: "",
};
const validationSchema = Yup.object({
  name: Yup.string().min(1, "Must be 1 character or more").required(),
  city: Yup.string()
    .min(1, "Must be 1 character or more")
    .max(20, "Must be 20 characters or less")
    .required(),
  address: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  rating: Yup.number().positive().min(1).max(5).required(),
  rating_google: Yup.number().positive().min(1).max(5),
  rating_ta: Yup.number().positive().min(1).max(5),
});
export const CafeForm: FC<CafeFuncPropsType> = ({ setCafeId, setCafeCity }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const onFormSubmit = async (
    values: valuesType,
    resetForm: (nextState?: Partial<FormikState<valuesType>>) => void,
  ) => {
    const cafeId = self.crypto.randomUUID();
    setCafeCity(values.city);
    setCafeId(cafeId);
    try {
      setIsLoading(true);
      await setDoc(doc(db, values.city, cafeId), {
        name: values.name,
        city: values.city,
        address: values.address,
        geopoint: new GeoPoint(
          parseFloat(values.latitude),
          parseFloat(values.longitude),
        ),
        id: cafeId,
        rating: parseFloat(values.rating),
        rating_google: parseFloat(values.rating_google),
        rating_ta: parseFloat(values.rating_ta),
      }).then(() => {
        setIsAdded(true), setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      alert("ошибка");
    }
    resetForm();
  };
  return (
    <div className={style.wrapper}>
      <h1 className={patrickHand400.className}>Добавить кофейню</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: valuesType, { resetForm }) => {
          onFormSubmit(values, resetForm);
        }}
      >
        <Form>
          <label htmlFor="name">Название кофейни</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="city">Город</label>
          <Field name="city" type="text" />
          <ErrorMessage name="city" />

          <label htmlFor="address">Адресс</label>
          <Field name="address" type="text" />
          <ErrorMessage name="address" />

          <div>
            <div>
              <label htmlFor="latitude">latitude</label>
              <Field name="latitude" type="text" />
              <ErrorMessage name="latitude" />
            </div>

            <div>
              <label htmlFor="longitude">longitude</label>
              <Field name="longitude" type="text" />
              <ErrorMessage name="longitude" />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="rating">Рейтинг</label>
              <Field name="rating" type="text" />
              <ErrorMessage name="rating" />
            </div>

            <div>
              <label htmlFor="rating_google">Рейтинг Google</label>
              <Field name="rating_google" type="text" />
              <ErrorMessage name="rating_google" />
            </div>

            <div>
              <label htmlFor="rating_ta">Рейтинг Trip Adviser</label>
              <Field name="rating_ta" type="text" />
              <ErrorMessage name="rating_ta" />
            </div>
          </div>

          <button type="submit" className={patrickHand400.className}>
            Создать кофейню
          </button>
        </Form>
      </Formik>
      {isLoading && <span>Загрузка...</span>}
      {isAdded && <span>Кафе добавлено</span>}
    </div>
  );
};
