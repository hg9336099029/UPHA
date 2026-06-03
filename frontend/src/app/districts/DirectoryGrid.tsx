import React from "react";

const sampleDistricts = [
  { id: "01", district: "LUCKNOW", abbr: "LK" },
  { id: "02", district: "KANPUR NAGAR", abbr: "KN" },
  { id: "03", district: "KANPUR DEHAT", abbr: "KD" },
  { id: "04", district: "AGRA", abbr: "AG" },
  { id: "05", district: "GHAZIABAD", abbr: "GZ" },
  { id: "06", district: "MEERUT", abbr: "MT" },
  { id: "07", district: "SAHARANPUR", abbr: "SH" },
  { id: "08", district: "MORADABAD", abbr: "MR" },
  { id: "09", district: "BAREILY", abbr: "BR" },
  { id: "10", district: "PRAYAGRAJ", abbr: "PR" },
  { id: "11", district: "VARANASI", abbr: "VN" },
  { id: "12", district: "BALLIA", abbr: "BA" },
  { id: "13", district: "GORAKHPUR", abbr: "GR" },
  { id: "14", district: "KUSHINAGAR", abbr: "KU" },
  { id: "15", district: "MAHARAJGANJ", abbr: "MH" },
  { id: "16", district: "SIDDHARTHANAGAR", abbr: "SD" },
  { id: "17", district: "AYODHYA", abbr: "AY" },
  { id: "18", district: "BASTI", abbr: "BS" },
  { id: "19", district: "SULTANPUR", abbr: "SU" },
  { id: "20", district: "ALIGARH", abbr: "AL" },
  { id: "21", district: "AMBEDKAR NAGAR", abbr: "AM" },
  { id: "22", district: "AMETHI", abbr: "AT" },
  { id: "23", district: "BHAGPAT", abbr: "BH" },
  { id: "24", district: "BAHRAICH", abbr: "BC" },
  { id: "25", district: "CHANDAULI", abbr: "CD" },
  { id: "26", district: "FATEHPUR", abbr: "FT" },
  { id: "27", district: "JHANSI", abbr: "JH" },
  { id: "28", district: "MAU", abbr: "MA" },
  { id: "29", district: "DEORIA", abbr: "DE" },
  { id: "30", district: "GAUTAM BUDH NAGAR", abbr: "GN" },
  { id: "31", district: "MATHURA", abbr: "MU" },
  { id: "32", district: "JAUNPUR", abbr: "JN" },
  { id: "33", district: "LAKHIMPUR", abbr: "LM" },
  { id: "34", district: "JALAUN", abbr: "JL" },
  { id: "35", district: "PRATAPGARH", abbr: "PT" },
  { id: "36", district: "GHAZIPUR", abbr: "GP" },
  { id: "37", district: "UNNAO", abbr: "UN" },
  { id: "38", district: "ETAWAH", abbr: "ET" },
  { id: "39", district: "AMROHA", abbr: "AR" },
  { id: "40", district: "BALRAMPUR", abbr: "BL" },
  { id: "41", district: "BANDA", abbr: "BD" },
  { id: "42", district: "BARABANKI", abbr: "BK" },
  { id: "43", district: "BIJNOUR", abbr: "BJ" },
  { id: "44", district: "BADAUN", abbr: "BU" },
  { id: "45", district: "BHADOHI", abbr: "BO" },
  { id: "46", district: "BULANDSHAHER", abbr: "BN" },
  { id: "47", district: "SONBHADRA", abbr: "SO" },
  { id: "48", district: "HAPUR", abbr: "HP" },
  { id: "49", district: "GONDA", abbr: "GO" },
  { id: "50", district: "KANNAUJ", abbr: "KJ" },
  { id: "51", district: "FARRUKHABAD", abbr: "FR" },
  { id: "52", district: "RAEBARELI", abbr: "RB" },
  { id: "53", district: "SITAPUR", abbr: "ST" },
  { id: "54", district: "AZAMGARH", abbr: "AZ" },
  { id: "55", district: "SHRAVASTI", abbr: "SR" },
  { id: "56", district: "HARDOI", abbr: "HO" },
  { id: "57", district: "MUZAFFARNAGAR", abbr: "MZ" },
  { id: "58", district: "SHAMLI", abbr: "SL" },
  { id: "59", district: "KAUSHAMBI", abbr: "KS" },
  { id: "60", district: "MIRZAPUR", abbr: "MI" }
];

export default function DirectoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {sampleDistricts.map((row, index) => (
        <div key={row.id} className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${index % 2 === 0 ? 'bg-[#111827] text-white' : 'bg-[#d97c55] text-white'}`}>
            <span className="font-heading font-bold tracking-wider">{row.abbr}</span>
          </div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-gray-800 mb-1">{row.district}</h3>
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">REF - {row.id}</div>
        </div>
      ))}
    </div>
  );
}
