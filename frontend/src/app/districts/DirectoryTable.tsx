import React from "react";

const sampleDistricts = [
  {
    id: "01",
    district: "LUCKNOW",
    president: { name: "Anurag Mishra", address: "Lucknow", phone: "9839036302" },
    secretary: { name: "Veenit Bisariya", address: "Lucknow", phone: "9839036302" }
  },
  {
    id: "02",
    district: "KANPUR NAGAR",
    president: { name: "Rajat Aditya Dixit", address: "120/551 Lapat Nagar, Kanpur", phone: "8881966755" },
    secretary: { name: "Sadhna Mishra", address: "Harjinder Nagar, Ramadevi Chauraha, Kanpur Nagar", phone: "-" }
  },
  {
    id: "03",
    district: "KANPUR DEHAT",
    president: { name: "Rajesh Singh", address: "Kanpur Dehat", phone: "-" },
    secretary: { name: "Sanjay Bajpayee", address: "Kanpur Dehat", phone: "-" }
  },
  {
    id: "04",
    district: "AGRA",
    president: { name: "Mahendra Gupta", address: "Hotel Deluxe III, Fatehabad Road, Agra", phone: "9412255282" },
    secretary: { name: "Manoj Bharadwaj", address: "8/338, Freeganj Road, Jeoni Mandi, Agra", phone: "9412255282" }
  },
  {
    id: "05",
    district: "GHAZIABAD",
    president: { name: "Sunil Jain", address: "116 Anaveen Market, Ghaziabad", phone: "-" },
    secretary: { name: "Narendra Sharma", address: "35, Prempuri, Ghaziabad", phone: "9810417900" }
  },
  {
    id: "06",
    district: "MEERUT",
    president: { name: "Vivek Kohli", address: "Civil Line, Meerut", phone: "-" },
    secretary: { name: "Sparsh Singh", address: "E 70 Shastri Nagar, Meerut", phone: "9897981983" }
  },
  {
    id: "07",
    district: "SAHARANPUR",
    president: { name: "Dr. A.K. Gupta", address: "Swardop Engineering Works, Khanpar, Saharanpur", phone: "9412233448" },
    secretary: { name: "Dr. A.K. Gupta", address: "Maharaj Singh College, Saharanpur", phone: "-" }
  },
  {
    id: "08",
    district: "MORADABAD",
    president: { name: "Ankit Sharma", address: "PAC Colony, Moradabad", phone: "9997012052" },
    secretary: { name: "Ajay Vikram Pathak", address: "174, Prakash Enclave, Moradabad", phone: "0956819985" }
  },
  {
    id: "09",
    district: "BAREILY",
    president: { name: "Mohd Faisal", address: "City Station Road, Bareily", phone: "-" },
    secretary: { name: "Fazil Beg", address: "119/260 Garhi Chaudhary, Bareily", phone: "9997576596" }
  },
  {
    id: "10",
    district: "PRAYAGRAJ",
    president: { name: "Shri Prakash", address: "Civil Lines, Prayagraj", phone: "-" },
    secretary: { name: "Kaushal Dixit", address: "Naini, Prayagraj", phone: "9918111157" }
  },
  {
    id: "58",
    district: "SHAMLI",
    president: { vacant: true },
    secretary: { vacant: true }
  },
  {
    id: "59",
    district: "KAUSHAMBI",
    president: { vacant: true },
    secretary: { vacant: true }
  },
  {
    id: "60",
    district: "MIRZAPUR",
    president: { name: "Amardeep Singh", address: "Director, Daffodils Public School, Mirzapur", phone: "-" },
    secretary: { name: "Ravinder Pal Singh", address: "Daffodils Public School, Mirzapur", phone: "-" }
  }
];

export default function DirectoryTable() {
  return (
    <div className="w-full overflow-x-auto shadow-sm border border-gray-200 rounded-sm">
      <table className="w-full text-left bg-white whitespace-nowrap min-w-[800px]">
        <thead>
          <tr className="bg-[#111827] text-white text-[10px] font-bold tracking-widest uppercase">
            <th className="py-4 px-6 w-16">#</th>
            <th className="py-4 px-6 w-1/4">DISTRICT</th>
            <th className="py-4 px-6 w-1/3">PRESIDENT &mdash; NAME & ADDRESS</th>
            <th className="py-4 px-6 w-1/3">SECRETARY &mdash; NAME & ADDRESS</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {sampleDistricts.map((row, index) => (
            <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-100 hover:bg-gray-50 transition-colors`}>
              <td className="py-6 px-6 align-top">
                <span className="text-accent font-mono font-bold text-xs">{row.id}</span>
              </td>
              <td className="py-6 px-6 align-top">
                <span className="font-heading font-bold text-gray-800 uppercase tracking-wide">{row.district}</span>
              </td>
              <td className="py-6 px-6 align-top">
                {row.president.vacant ? (
                  <span className="text-gray-400 italic text-xs">&mdash; Vacant &mdash;</span>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-800">{row.president.name}</span>
                    <span className="text-[11px] text-gray-400 whitespace-normal">{row.president.address}</span>
                    {row.president.phone !== "-" && (
                      <span className="text-[11px] font-bold tracking-widest text-accent mt-1">{row.president.phone}</span>
                    )}
                  </div>
                )}
              </td>
              <td className="py-6 px-6 align-top">
                {row.secretary.vacant ? (
                  <span className="text-gray-400 italic text-xs">&mdash; Vacant &mdash;</span>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-800">{row.secretary.name}</span>
                    <span className="text-[11px] text-gray-400 whitespace-normal">{row.secretary.address}</span>
                    {row.secretary.phone !== "-" && (
                      <span className="text-[11px] font-bold tracking-widest text-accent mt-1">{row.secretary.phone}</span>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
