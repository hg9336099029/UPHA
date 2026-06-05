// ─── Base URL ────────────────────────────────────────────────────────────────
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
const ADMIN_BASE = `${API_BASE}/admin`;

// ─── TypeScript Interfaces ────────────────────────────────────────────────────

export interface UserData {
  id: number;
  username: string;
  email: string;
  name: string;
  role: "admin" | "player" | "coach" | "referee";
  phone_number: string;
  gender: string;
  created_at: string;
  father_name?: string;
  mother_name?: string;
  blood_group?: string;
  date_of_birth?: string;
  adhar_number?: string;
  adhar_image?: string | null;
  passport_image?: string | null;
}

export interface PlayerData {
  id: number;
  user: UserData;
  district: string;
  dominant_hand: string;
  club_name: string;
  school_name: string;
  coach_name: string;
  height: number;
  weight: number;
  transaction_id: string;
  transaction_image: string | null;
  certificate_image: string | null;
  paid: boolean;
}

export interface CoachData {
  id: number;
  user: UserData;
  district: string;
  occupation: string;
  highest_coaching_grade: string;
  transaction_id: string;
  transaction_image: string | null;
  paid: boolean;
}

export interface RefereeData {
  id: number;
  user: UserData;
  district: string;
  occupation: string;
  grade_applying_for: string;
  year_of_officiating_experience: number;
  highest_level_officiated: string;
  tournament_officiated: string;
  previous_referee_id: string;
  transaction_id: string;
  transaction_image: string | null;
  paid: boolean;
}

export interface AcademyData {
  id: number;
  name: string;
  district: string;
  year_of_establishment: number;
  logo: string | null;
  trust_registration_number: string;
  office_address: string;
  office_phone_number: string;
  email: string;
  website: string | null;
  no_of_players: number;
  adhyaksha: UserData | null;
  sachiv: UserData | null;
  koshadhyaksha: UserData | null;
  registration_certificate: string | null;
  transaction_id: string;
  transaction_image: string | null;
  paid: boolean;
}

export interface EventData {
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  registration_end_date: string;
  category: string;
  created_at: string;
  results: EventResultData[];
}

export interface EventResultData {
  id: number;
  event: { id: number; name: string };
  player: PlayerData;
  position: number;
}

export type MeData =
  | { type: "player"; data: PlayerData }
  | { type: "coach"; data: CoachData }
  | { type: "referee"; data: RefereeData };

// ─── Core Fetch Utility ───────────────────────────────────────────────────────

async function apiFetch<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || `Error ${res.status}: ${res.statusText}`);
  }

  return json as T;
}

async function multipartApiFetch<T = unknown>(
  url: string,
  formData: FormData
): Promise<T> {
  return apiFetch<T>(url, { method: "POST", body: formData });
}

export async function registerPlayer(formData: FormData) {
  return multipartApiFetch<{ success: boolean; message: string; player: PlayerData }>(
    `${API_BASE}/register/player/`,
    formData
  );
}

export async function registerCoach(formData: FormData) {
  return multipartApiFetch<{ success: boolean; message: string; coach: CoachData }>(
    `${API_BASE}/register/coach/`,
    formData
  );
}

export async function registerReferee(formData: FormData) {
  return multipartApiFetch<{ success: boolean; message: string; referee: RefereeData }>(
    `${API_BASE}/register/referee/`,
    formData
  );
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  return apiFetch<{ success: boolean; message: string; user: UserData }>(
    `${API_BASE}/login/`,
    { method: "POST", body: JSON.stringify({ email, password }) }
  );
}

export async function logout() {
  return apiFetch<{ success: boolean; message: string }>(
    `${API_BASE}/logout/`,
    { method: "POST", body: JSON.stringify({}) }
  );
}

export async function getMe(): Promise<{
  success: boolean;
  message: string;
  user: PlayerData | CoachData | RefereeData;
}> {
  return apiFetch(`${API_BASE}/me/`);
}

// ─── Listing (Public / Admin) ─────────────────────────────────────────────────

export async function listPlayers() {
  return apiFetch<{ success: boolean; players: PlayerData[] }>(
    `${API_BASE}/players/`
  );
}

export async function listCoaches() {
  return apiFetch<{ success: boolean; coaches: CoachData[] }>(
    `${API_BASE}/coaches/`
  );
}

export async function listReferees() {
  return apiFetch<{ success: boolean; referees: RefereeData[] }>(
    `${API_BASE}/referees/`
  );
}

export async function listAcademies() {
  return apiFetch<{ success: boolean; academies: AcademyData[] }>(
    `${API_BASE}/academies/`
  );
}

export async function listEvents(year?: string) {
  const url = year
    ? `${API_BASE}/events/?year=${encodeURIComponent(year)}`
    : `${API_BASE}/events/`;
  return apiFetch<{ success: boolean; events: EventData[] }>(url);
}

export async function listEventResults() {
  return apiFetch<{ success: boolean; results: EventResultData[] }>(
    `${API_BASE}/event-results/`
  );
}

// ─── Admin: Payment Approvals ─────────────────────────────────────────────────

export async function approvePlayerPayment(playerId: number | string) {
  return apiFetch<{ success: boolean; message: string; player: PlayerData }>(
    `${ADMIN_BASE}/players/${playerId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true }) }
  );
}

export async function approveCoachPayment(coachId: number | string) {
  return apiFetch<{ success: boolean; message: string; coach: CoachData }>(
    `${ADMIN_BASE}/coaches/${coachId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true }) }
  );
}

export async function approveRefereePayment(refereeId: number | string) {
  return apiFetch<{ success: boolean; message: string; referee: RefereeData }>(
    `${ADMIN_BASE}/referees/${refereeId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true }) }
  );
}

export async function approveAcademyPayment(academyId: number | string) {
  return apiFetch<{ success: boolean; message: string; academy: AcademyData }>(
    `${ADMIN_BASE}/academies/${academyId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true }) }
  );
}

// ─── Admin: Event Management ──────────────────────────────────────────────────

export interface CreateEventPayload {
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  registration_end_date: string;
  category: string;
}

export async function createEvent(payload: CreateEventPayload) {
  return apiFetch<{ success: boolean; message: string; event: EventData }>(
    `${ADMIN_BASE}/events/create/`,
    { method: "POST", body: JSON.stringify(payload) }
  );
}

export async function deleteEvent(eventId: number | string) {
  return apiFetch<{ success: boolean; message: string }>(
    `${ADMIN_BASE}/events/${eventId}/delete/`,
    { method: "POST", body: JSON.stringify({}) }
  );
}

export interface AddEventResultPayload {
  player_id: number | string;
  position: number;
}

export async function addEventResult(
  eventId: number | string,
  payload: AddEventResultPayload
) {
  return apiFetch<{ success: boolean; message: string; result: EventResultData }>(
    `${ADMIN_BASE}/events/${eventId}/results/`,
    { method: "POST", body: JSON.stringify(payload) }
  );
}
