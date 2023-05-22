import { VacancyType } from "../api/types";

export const loadState: any = () => {
  try {
    const serializedState = localStorage.getItem("Jobored");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState: any = (state: {
  auth: {
    login: {
      access_token: string;
      refresh_token: string;
      ttl: number;
      expires_in: number;
      token_type: string;
      reg_user_resumes_count: number;
    };
    favourites: VacancyType;
  };
}) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem("Jobored", serializedState);
  } catch {
    // ignore write errors
  }
};
