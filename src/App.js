import { useState, useRef } from 'react';
import styles from './App.module.css';

const validatePasswordAndGetError = (password, password2) => {
	let newError = null;

	if (password === '' || password2 === '') {
		newError = true;
	} else if (!/^[\w_]*$/.test(password)) {
		newError =
			'Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание';
	} else if (password.length < 6) {
		newError = 'Неверный пароль. Должно быть не меньше 6 символов';
	} else if (password !== password2) {
		newError = 'Пароли не совпадают';
	}
	return newError;
};

const sendFormData = (formData) => {
	console.log('Вы зарегистрированы, вот данные формы:');
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [passwordsErrors, setPasswordsErrors] = useState(null);

	const submitButtonRef = useRef(null);

	const onPasswordChange = ({ target }) => {
		// console.log('1');
		setPassword(target.value);
		const passError = validatePasswordAndGetError(target.value, password2);

		// console.log('target.value=', target.value, ' passError=', passError);
		// console.log(
		// 	'onPasswordChange pass target.value=',
		// 	target.value,
		// 	' passError=',
		// 	passError,
		// );
		if (!passError) {
			console.log('!!!!!!!!', submitButtonRef.current);
			submitButtonRef.current.disabled = false;
			submitButtonRef.current.focus();
		}
		setPasswordsErrors(passError);
	};

	const onPasswordBlur = ({ target }) => {
		// console.log('2');
		// const passError = validatePasswordAndGetError(target.value, password2);
		// console.log(
		// 	'onPasswordBlur pass target.value=',
		// 	target.value,
		// 	' passError=',
		// 	passError,
		// );
		// if (!passError) {
		// 	console.log('!!!!!!!!', submitButtonRef.current);
		// 	submitButtonRef.current.disabled = false;
		// 	submitButtonRef.current.focus();
		// }
		// setPasswordsErrors(passError);
	};

	const onPasswordChange2 = ({ target }) => {
		// console.log('3');
		setPassword2(target.value);

		const passError = validatePasswordAndGetError(password, target.value);
		// setPasswordsErrors(validatePasswordAndGetError(target.value, password));
		// console.log('target.value=', target.value, ' passError=', passError);
		// console.log(
		// 	'onPasswordChange2 pass2 target.value=',
		// 	target.value,
		// 	' passError=',
		// 	passError,
		// );
		// if (!passError) {
		// 	console.log('!!!!!!!!', submitButtonRef.current);
		// 	submitButtonRef.current.disabled = false;
		// 	submitButtonRef.current.focus();
		// }
		if (!passError) {
			console.log('!!!!!!!!', submitButtonRef.current);
			submitButtonRef.current.disabled = false;
			submitButtonRef.current.focus();
		}
		setPasswordsErrors(passError);
	};

	const onPasswordBlur2 = ({ target }) => {
		// console.log('4');
		// const passError = validatePasswordAndGetError(password, target.value);
		// console.log(
		// 	'onPasswordBlur2 pass2 target.value=',
		// 	target.value,
		// 	' passError=',
		// 	passError,
		// );
		// console.log('submitButtonRef.current.focus()=', !passError);
		// if (!passError) {
		// 	console.log('!!!!!!!!', submitButtonRef.current);
		// 	submitButtonRef.current.disabled = false;
		// 	submitButtonRef.current.focus();
		// }
		// setPasswordsErrors(passError);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		// sendFormData({ email, login, password });
		sendFormData({ email, password, password2 });
		alert('Вы зарегистрированы!');
	};

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				<h1 className={styles.title}>Регистрация</h1>
				<label className={styles.label}>Почта</label>
				<input
					className={styles.input}
					name="email"
					type="email"
					placeholder="Почта"
					value={email}
					onChange={({ target }) => setEmail(target.value)}
					// onChange={onEmailChange}
					// onBlur={onEmailBlur}
				/>
				{/* <input
					name="login"
					type="text"
					placeholder="Логин"
					value={login}
					onChange={({ target }) => setLogin(target.value)}
				/> */}
				<div>
					Пароль должен быть не меньше 6 символов и может содержать буквы и
					цифры и нижнее подчёркивание
				</div>
				<label className={styles.label}>Пароль</label>
				<input
					className={styles.input}
					name="password"
					type="password"
					placeholder="Пароль"
					value={password}
					// onChange={({ target }) => setPassword(target.value)}
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
					// if (target.value !== '' && target.value === password2) {
					// 	submitButtonRef.current.focus();
					// }
				/>
				<label className={styles.label}>Подтверждение пароля</label>
				<input
					className={styles.input}
					name="password2"
					type="password"
					placeholder="Подтвердите пароль"
					value={password2}
					// onChange={({ target }) => setPassword2(target.value)}
					// onChange={onPasswordChange2}
					// onChange={({target})={
					// 	onPasswordChange2(target);
					// 	// if (target.value !=="" && target.value === password) {
					// 	// 	submitButtonRef.current.focus();
					// 	// }

					// }}
					onChange={onPasswordChange2}
					onBlur={onPasswordBlur2}
				/>
				{passwordsErrors && (
					<div className={styles.errorLabel}>{passwordsErrors}</div>
				)}
				<button
					ref={submitButtonRef}
					className={styles['button-submit']}
					type="submit"
					disabled={validatePasswordAndGetError(password, password2)}
					// disabled={!!passwordsErrors}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
