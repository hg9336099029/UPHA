// ─── Base URL ────────────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
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
  event: {
    id: number;
    name: string | null;
  };
  player: PlayerData;
  position: number;
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

export interface AcademyData {
  id: number;
  logo: string | null;
  name: string;
  district: string;
  paid: boolean;
  year_of_establishment: number;
  no_of_players: number;
  website: string | null;
  email: string;
  office_address: string;
  office_phone_number: string;
  adhyaksha?: { name: string };
  sachiv?: { name: string };
}

export type MeData =
  | { type: "player"; data: PlayerData }
  | { type: "coach"; data: CoachData }
  | { type: "referee"; data: RefereeData }
  | { type: "academy"; data: AcademyData };

// ─── Core Fetch Utility ───────────────────────────────────────────────────────

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

// ─── User Profile ─────────────────────────────────────────────────────────────

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

export async function getMyCertificates(): Promise<{ success: boolean; message?: string; certificates?: CertificateData[] }> {
  return apiFetch<{ success: boolean; message?: string; certificates?: CertificateData[] }>(`${API_BASE}/me/certificates/`);
}

export async function getMyAssignments(): Promise<{ success: boolean; message?: string; assignments?: EventAssignmentData[] }> {
  return apiFetch<{ success: boolean; message?: string; assignments?: EventAssignmentData[] }>(`${API_BASE}/me/assignments/`);
}


// ─── Settings ─────────────────────────────────────────────────────────────────────

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

// ─── Listing (Public / Admin) ─────────────────────────────────────────────────

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

export async function rejectApplication(type: string, id: number | string, notes: string) {
  return apiFetch<{ success: boolean; message: string }>(
    `${ADMIN_BASE}/reject/`,
    { method: "POST", body: JSON.stringify({ type, id, notes }) }
  );
}

export async function inviteAdmin(payload: { email: string; name: string }) {
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

// ─── Albums ───────────────────────────────────────────────────────────────────

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

// ─── Districts ─────────────────────────────────────────────────────────────

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


// ─── Achievements ─────────────────────────────────────────────────────────────

export interface PlayerAchievementData {
  id: string;
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
  id: string;
  name: string;
  award_name: string;
  year: string;
  role_description: string;
  coach_id_str: string;
}

export interface FederationAwardData {
  id: string;
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

export async function listAchievements() {
  return apiFetch<{
    success: boolean;
    players: PlayerAchievementData[];
    coaches: CoachAchievementData[];
    awards: FederationAwardData[];
    medals: NationalMedalData[];
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

// ─── Albums ───────────────────────────────────────────────────────────────────

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

// ─── Districts ─────────────────────────────────────────────────────────────

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


// ─── Achievements ─────────────────────────────────────────────────────────────

export interface PlayerAchievementData {
  id: string;
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
  id: string;
  name: string;
  award_name: string;
  year: string;
  role_description: string;
  coach_id_str: string;
}

export interface FederationAwardData {
  id: string;
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

export async function listAchievements() {
  return apiFetch<{
    success: boolean;
    players: PlayerAchievementData[];
    coaches: CoachAchievementData[];
    awards: FederationAwardData[];
    medals: NationalMedalData[];
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
