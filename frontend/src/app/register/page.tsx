import RegistrationCards from "@/components/RegistrationCards";

export default function RegisterSelectionPage() {
  return (
    <div className="flex-1 bg-background text-foreground flex flex-col py-12">
      <div className="text-center mb-8 mt-12">
        <h1 className="text-5xl font-heading font-bold uppercase tracking-widest text-primary">Join UPHA</h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Select your role to begin the registration or accreditation process.
        </p>
      </div>
      <RegistrationCards />
    </div>
  );
}
