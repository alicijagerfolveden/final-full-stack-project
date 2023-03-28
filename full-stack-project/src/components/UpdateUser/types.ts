export type TUser = {
  id: number;
  name: string | null;
  surname: string | null;
  email: string | null;
  birthdate: string | number | readonly string[] | undefined;
  event_id: number;
  event_name: string | null | undefined;
};
