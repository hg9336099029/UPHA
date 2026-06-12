// ΓöÇΓöÇΓöÇ Base URL ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const ADMIN_BASE = `${API_BASE}/admin`;

// ΓöÇΓöÇΓöÇ TypeScript Interfaces ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

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
  coach_name: string | null;
  coach_mobile: string | null;
  coach_email: string | null;
  coach_experience: number;
  registration_certificate: string | null;
  transaction_id: string;
  transaction_image: string | null;
  paid: boolean;
}

export interface DistrictData {
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
  | { type: "referee"; data: RefereeData }
  | { type: "academy"; data: AcademyData };

// ΓöÇΓöÇΓöÇ Core Fetch Utility ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

function getFriendlyErrorMessage(errorMsg: string): string {
  if (!errorMsg) return "An unknown error occurred.";
  
  const msg = errorMsg.toLowerCase();
  if (msg.includes("duplicate key value violates unique constraint")) {
    if (msg.includes("email")) return "This email address is already registered.";
    if (msg.includes("phone_number")) return "This phone number is already registered.";
    if (msg.includes("adhar_number") || msg.includes("aadhar")) return "This Aadhar number is already registered.";
    if (msg.includes("trust_registration_number")) return "This Society/Trust Registration Number is already registered.";
    if (msg.includes("transaction_id")) return "This Payment Transaction ID has already been used.";
    return "A record with this information already exists. Please check your details and try again.";
  }
  
  return errorMsg;
}

async function apiFetch<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    cache: "no-store",
    ...options,
    headers,
    credentials: "include",
  });

  let json;
  try {
    json = await res.json();
  } catch (e) {
    // If not JSON, we'll handle it via res.ok check below
  }

  if (!res.ok) {
    const rawMsg = json?.message || json?.error || json?.detail || `Error ${res.status}: ${res.statusText}`;
    throw new Error(getFriendlyErrorMessage(String(rawMsg)));
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

export async function registerDistrict(formData: FormData) {
  return multipartApiFetch<{ success: boolean; message: string; district: DistrictData }>(
    `${API_BASE}/register/district/`,
    formData
  );
}

export async function registerAcademy(formData: FormData) {
  return multipartApiFetch<{ success: boolean; message: string; academy: AcademyData }>(
    `${API_BASE}/register/academy/`,
    formData
  );
}

// ΓöÇΓöÇΓöÇ User Profile ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export interface NotificationData {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function getNotifications() {
  return apiFetch<{ success: boolean; notifications: NotificationData[] }>(
    `${API_BASE}/notifications/`
  );
}

export async function markNotificationRead(id: number) {
  return apiFetch<{ success: boolean; message: string }>(
    `${API_BASE}/notifications/${id}/read/`,
    { method: "POST" }
  );
}


// ΓöÇΓöÇΓöÇ Settings ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

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

export async function updateCredentials(current_password: string, new_password?: string, new_email?: string) {
  return apiFetch<{ success: boolean; message: string }>(
    `${API_BASE}/update-credentials/`,
    {
      method: "POST",
      body: JSON.stringify({ current_password, new_password, new_email }),
    }
  );
}

export async function getMe(): Promise<{
  success: boolean;
  message: string;
  user: PlayerData | CoachData | RefereeData;
}> {
  return apiFetch(`${API_BASE}/me/`);
}

// ΓöÇΓöÇΓöÇ Listing (Public / Admin) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export interface OfficeBearerData {
  id: number;
  name: string;
  role: string;
  image: string | null;
  order: number;
}

export async function listOfficeBearers() {
  return apiFetch<{ success: boolean; office_bearers: OfficeBearerData[] }>(
    `${API_BASE}/office-bearers/`
  );
}

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

export async function getMyAcademyPlayers() {
  return apiFetch<{ success: boolean; players: PlayerData[] }>(
    `${API_BASE}/me/academy/players/`
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

// ΓöÇΓöÇΓöÇ Admin: Payment Approvals ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export async function approvePlayerPayment(playerId: number | string, notes?: string) {
  return apiFetch<{ success: boolean; message: string; player: PlayerData }>(
    `${ADMIN_BASE}/players/${playerId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true, notes }) }
  );
}

export async function approveCoachPayment(coachId: number | string, notes?: string) {
  return apiFetch<{ success: boolean; message: string; coach: CoachData }>(
    `${ADMIN_BASE}/coaches/${coachId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true, notes }) }
  );
}

export async function approveRefereePayment(refereeId: number | string, notes?: string) {
  return apiFetch<{ success: boolean; message: string; referee: RefereeData }>(
    `${ADMIN_BASE}/referees/${refereeId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true, notes }) }
  );
}

export async function approveAcademyPayment(academyId: number | string, notes?: string) {
  return apiFetch<{ success: boolean; message: string; academy: AcademyData }>(
    `${ADMIN_BASE}/academies/${academyId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true, notes }) }
  );
}

export async function approveDistrictPayment(districtId: number | string, notes?: string) {
  return apiFetch<{ success: boolean; message: string; district: DistrictData }>(
    `${ADMIN_BASE}/districts/${districtId}/payment/`,
    { method: "POST", body: JSON.stringify({ paid: true, notes }) }
  );
}

export async function rejectApplication(type: string, id: number | string, notes: string) {
  return apiFetch<{ success: boolean; message: string }>(
    `${ADMIN_BASE}/reject/`,
    { method: "POST", body: JSON.stringify({ type, id, notes }) }
  );
}

export async function inviteAdmin(payload: { email: string; name: string; password?: string }) {
  return apiFetch<{ success: boolean; message: string; credentials: { email: string; password: string; name: string } }>(
    `${API_BASE}/invite-admin/`,
    { method: "POST", body: JSON.stringify(payload) }
  );
}

export interface AdminStatsData {
  approved_today: number;
  approved_this_week: number;
  rejected_this_month: number;
  total_pending: number;
  pending_players: number;
  pending_coaches: number;
  pending_referees: number;
  pending_academies: number;
  active_events: number;
  draft_events: number;
  results_awaiting: number;
  gallery_albums: number;
  active_admins: number;
  scheduled_notices: number;
}

export async function getAdminStats(): Promise<{ success: boolean; message: string; stats: AdminStatsData }> {
  return apiFetch<{ success: boolean; message: string; stats: AdminStatsData }>(`${ADMIN_BASE}/stats/`);
}

export interface DecisionLogData {
  id: number;
  applicant_type: string;
  applicant_id: number;
  action: string;
  applicant_name_ref: string;
  details: string;
  admin_name: string;
  notes: string;
  created_at: string;
}

export async function getDecisionLog() {
  return apiFetch<{ success: boolean; decisions: DecisionLogData[] }>(
    `${ADMIN_BASE}/decisions/`
  );
}

// ΓöÇΓöÇΓöÇ Admin: Event Management ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

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

// ΓöÇΓöÇΓöÇ Albums ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export interface AlbumData {
  id: number;
  title: string;
  description: string;
  date: string | null;
  event: { id: number; name: string; location: string; category: string; } | null;
  cover_photo: string | null;
  photo_count: number;
  created_at: string;
}

export async function listAlbums() {
  return apiFetch<{ success: boolean; message: string; albums: AlbumData[] }>(
    `${API_BASE}/gallery/albums/`
  );
}

export async function createAlbum(formData: FormData) {
  return multipartApiFetch<{ success: boolean; message: string; album: AlbumData }>(
    `${API_BASE}/gallery/albums/create/`,
    formData
  );
}

// ΓöÇΓöÇΓöÇ Districts ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export interface DistrictData {
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

export async function listDistricts() {
  return apiFetch<{ success: boolean; districts: DistrictData[] }>(
    `${API_BASE}/districts/`
  );
}


// ΓöÇΓöÇΓöÇ Achievements ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export interface PlayerAchievementData {
  id: number;
  name: string;
  district: string;
  position: string;
  player_id_str: string;
  event_name: string;
  event_location: string;
  description: string;
  category_tag: string;
  color_theme: string;
}

export interface CoachAchievementData {
  id: number;
  name: string;
  award_name: string;
  year: string;
  role_description: string;
  coach_id_str: string;
}

export interface FederationAwardData {
  id: number;
  year: string;
  award_name: string;
  awarded_by: string;
}

export interface NationalMedalData {
  id: number;
  year: string;
  medal_type: string;
  title: string;
  description: string;
  category: string;
  result: string;
  created_at: string;
}

export interface TournamentStandingData {
  position: number;
  team_name: string;
  notes: string;
}

export interface TournamentResultData {
  event_id: number;
  event_name: string;
  event_location: string;
  event_category: string;
  final_date: string | null;
  total_matches: number | null;
  top_scorer: string;
  best_player: string;
  best_goalkeeper: string;
  most_promising_junior: string;
  uploaded_at: string;
  standings: TournamentStandingData[];
}

export async function listAchievements() {
  return apiFetch<{
    success: boolean;
    players: PlayerAchievementData[];
    coaches: CoachAchievementData[];
    awards: FederationAwardData[];
    medals: NationalMedalData[];
    tournament_results: TournamentResultData[];
  }>(`${API_BASE}/achievements/`);
}

export interface GlobalStatsData {
  districts: number;
  players: number;
  coaches: number;
  tournaments: number;
}

export async function getGlobalStats() {
  return apiFetch<{ success: boolean; stats: GlobalStatsData }>(
    `${API_BASE}/stats/`,
    { cache: "no-store" }
  );
}

export interface CertificateData {
  id: number;
  title: string;
  status: string;
  details: string;
  certificate_id: string;
  icon_type: string;
  created_at: string;
}

export interface EventAssignmentData {
  id: number;
  event: {
    id: number;
    name: string;
    location: string;
    start_date: string;
    end_date: string;
    category: string;
  };
  status: string;
  role: string;
  created_at: string;
}

export async function getMyCertificates(): Promise<{ success: boolean; message?: string; certificates?: CertificateData[] }> {
  return apiFetch<{ success: boolean; message?: string; certificates?: CertificateData[] }>(`${API_BASE}/me/certificates/`);
}

export async function getMyAssignments(): Promise<{ success: boolean; message?: string; assignments?: EventAssignmentData[] }> {
  return apiFetch<{ success: boolean; message?: string; assignments?: EventAssignmentData[] }>(`${API_BASE}/me/assignments/`);
}

// --- Announcements ---

export interface AnnouncementData {
  id: number;
  title: string;
  message: string;
  created_at: string;
}

export async function getAnnouncements(): Promise<{ success: boolean; announcements: AnnouncementData[] }> {
  return apiFetch<{ success: boolean; announcements: AnnouncementData[] }>(`${API_BASE}/announcements/`);
}

export async function createAnnouncement(payload: { title: string; message: string }): Promise<{ success: boolean; message: string; announcement: AnnouncementData }> {
  return apiFetch<{ success: boolean; message: string; announcement: AnnouncementData }>(
    `${ADMIN_BASE}/announcements/create/`,
    { method: 'POST', body: JSON.stringify(payload) }
  );
}

// --- Referee Stats ---

export interface RefereeBoardMember {
  name: string;
  role: string;
  initials: string;
}

export interface RefereeStats {
  total_referees: number;
  districts_represented: number;
  board_count: number;
  board_members: RefereeBoardMember[];
}

export async function getRefereeStats(): Promise<{ success: boolean } & RefereeStats> {
  return apiFetch<{ success: boolean } & RefereeStats>(`${API_BASE}/referee-stats/`);
}

// --- District Stats ---

export interface DistrictStats {
  total_districts: number;
  affiliated: number;
  open: number;
}

export async function getDistrictStats(): Promise<{ success: boolean } & DistrictStats> {
  return apiFetch<{ success: boolean } & DistrictStats>(`${API_BASE}/district-stats/`);
}

// --- Tournament Results Upload ---

export interface StandingPayload {
  team: string;
  notes: string;
}

export async function uploadTournamentResults(
  eventId: number | string,
  payload: {
    standings: StandingPayload[];
    final_date?: string;
    total_matches?: string;
    top_scorer?: string;
    best_player?: string;
    best_goalkeeper?: string;
    most_promising_junior?: string;
    scoresheet?: File | null;
  }
): Promise<{ success: boolean; message: string; event_id: number; event_name: string; standings_saved: number }> {
  const form = new FormData();
  form.append("standings", JSON.stringify(payload.standings));
  if (payload.final_date) form.append("final_date", payload.final_date);
  if (payload.total_matches) form.append("total_matches", payload.total_matches);
  if (payload.top_scorer) form.append("top_scorer", payload.top_scorer);
  if (payload.best_player) form.append("best_player", payload.best_player);
  if (payload.best_goalkeeper) form.append("best_goalkeeper", payload.best_goalkeeper);
  if (payload.most_promising_junior) form.append("most_promising_junior", payload.most_promising_junior);
  if (payload.scoresheet) form.append("scoresheet", payload.scoresheet);

  return multipartApiFetch(
    `${ADMIN_BASE}/events/${eventId}/upload-results/`,
    form
  );
}

// --- Council Members (Office Bearers) --------------------------

export interface OfficeBearerData {
  id: number;
  name: string;
  role: string;
  image: string | null;
  order: number;
}

export function getOfficeBearers() {
  return apiFetch<{ success: boolean; office_bearers: OfficeBearerData[] }>(`${API_BASE}/office-bearers/`);
}

export function createOfficeBearer(data: FormData) {
  return multipartApiFetch<{ success: boolean; message: string; bearer: OfficeBearerData }>(
    `${ADMIN_BASE}/office-bearers/`,
    data
  );
}

export function updateOfficeBearer(data: FormData) {
  return multipartApiFetch<{ success: boolean; message: string; }>(
    `${ADMIN_BASE}/office-bearers/`,
    data
  );
}

export function deleteOfficeBearer(id: number) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/office-bearers/`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}

// Achievements Admin API
export function createNationalMedal(data: Partial<NationalMedalData>) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/medals/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export function updateNationalMedal(data: Partial<NationalMedalData>) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/medals/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
export function deleteNationalMedal(id: number) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/medals/`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}

export function createPlayerAchievement(data: Partial<PlayerAchievementData>) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/players/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export function updatePlayerAchievement(data: Partial<PlayerAchievementData>) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/players/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
export function deletePlayerAchievement(id: number) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/players/`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}

export function createCoachAchievement(data: Partial<CoachAchievementData>) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/coaches/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export function updateCoachAchievement(data: Partial<CoachAchievementData>) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/coaches/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
export function deleteCoachAchievement(id: number) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/coaches/`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}

export function createFederationAward(data: Partial<FederationAwardData>) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/awards/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export function updateFederationAward(data: Partial<FederationAwardData>) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/awards/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
export function deleteFederationAward(id: number) {
  return apiFetch<{ success: boolean; message: string; }>(`${ADMIN_BASE}/achievements/awards/`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}
