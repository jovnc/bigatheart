import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
			},
		},
	});

	let authError = null;

	if (data.user && data.user.identities && data.user.identities.length === 0) {
		authError = {
			name: "AuthApiError",
			message: "User already exists",
		};
	} else if (error)
		authError = {
			name: error.name,
			message: error.message,
		};

	if (authError) throw new Error(authError.message);

	return data;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);
	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function changeEmail({ currentEmail, email, newEmail, password }) {
	// check if email matches
	if (currentEmail !== email)
		throw new Error("Please enter your correct email");
	// check if new email is same as current email
	if (currentEmail === newEmail)
		throw new Error("Cannot set new email to current email");

	// TODO: check if current password is correct

	// if both matches, update email
	const { data, error } = await supabase.auth.updateUser({ email: newEmail });
	if (error) throw new Error(error.message);

	return data;
}

export async function changePassword({
	password,
	newPassword,
	confirmNewPassword,
}) {
	// check if new passwords match
	if (newPassword !== confirmNewPassword)
		throw new Error("Passwords do not match");

	// TODO: check if current password is correct

	// if both matches, update password
	const { data, error } = await await supabase.auth.updateUser({
		password: newPassword,
	});
	if (error) throw new Error(error.message);

	return data;
}
