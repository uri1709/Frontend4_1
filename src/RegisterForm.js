import { useState, useRef } from 'react';
import styles from './RegisterForm.module.css'; // Импортируем CSS файл

export const RegisterForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({});

	const submitButtonRef = useRef(null);
	let refIsValid = useRef(false);

	const validateEmail = (email) => {
		console.log('validateEmail=', email);

		const newErrors = {};
		if (email === '') {
			newErrors.email = 'Email обязателен';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Неверный формат email';
		}
		return newErrors;
	};

	const validatePassword = (password) => {
		console.log('validatePassword=', password);

		const newErrors = {};
		if (password === '') {
			newErrors.password = 'Пароль обязателен';
		} else if (password.length < 6) {
			newErrors.password = 'Пароль должен быть не менее 6 символов';
		}
		return newErrors;
	};

	const validateConfirmPassword = (confirmPassword) => {
		console.log('validateConfirmPassword=', confirmPassword);

		const newErrors = {};
		if (confirmPassword === '') {
			newErrors.confirmPassword = 'Подтверждение пароля обязательно';
		} else if (formData.password !== confirmPassword) {
			newErrors.confirmPassword = 'Подтверждение пароля должно совпадать';
		}
		return newErrors;
	};

	const validateForm = ({ name, value }) => {
		let newErrors = {};

		console.log('validateForm ', ' name=', name, ' value=', value);
		if (name === 'email') {
			newErrors = { ...newErrors, ...validateEmail(value) };
		} else {
			newErrors = { ...newErrors, ...validateEmail(formData.email) };
		}

		if (name === 'password') {
			newErrors = { ...newErrors, ...validatePassword(value) };
		} else {
			newErrors = { ...newErrors, ...validatePassword(formData.password) };
		}

		if (name === 'confirmPassword') {
			newErrors = { ...newErrors, ...validateConfirmPassword(value) };
		} else {
			newErrors = {
				...newErrors,
				...validateConfirmPassword(formData.confirmPassword),
			};
		}

		if (!Object.keys(newErrors).length) {
			refIsValid.current = true;
			submitButtonRef.current.focus();
		} else {
			refIsValid.current = false;
		}

		return newErrors;
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		setErrors(validateForm({ name, value }));
	};

	const handleOnBlur = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		setErrors(validateForm({ name, value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert('Вы зарегистрированы!');
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h1 className={styles.title}>Регистрация </h1>
			<div className="form-group">
				<label className={styles.label}>
					Email:
					<input
						className={styles.input}
						type="email"
						name="email"
						value={formData.email}
						onChange={handleOnChange}
						onBlur={handleOnBlur}
					/>
				</label>
				{errors.email && <span className="error">{errors.email}</span>}
			</div>
			<div className="form-group">
				<label className={styles.label}>
					Пароль:
					<input
						className={styles.input}
						type="password"
						name="password"
						value={formData.password}
						onChange={handleOnChange}
						onBlur={handleOnBlur}
					/>
				</label>
				{errors.password && <span className="error">{errors.password}</span>}
			</div>
			<div className="form-group">
				<label className={styles.label}>
					Повторите пароль:
					<input
						className={styles.input}
						type="password"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleOnChange}
						onBlur={handleOnBlur}
					/>
				</label>
				{errors.confirmPassword && (
					<span className="error">{errors.confirmPassword}</span>
				)}
			</div>
			<button
				className={styles['button-submit']}
				type="submit"
				ref={submitButtonRef}
				disabled={!refIsValid.current}
				// disabled={!Object.keys(errors).length === 0}
			>
				Зарегистрироваться
			</button>
		</form>
	);
};

// export default RegisterForm;
