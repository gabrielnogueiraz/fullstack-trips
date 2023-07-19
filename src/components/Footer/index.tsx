import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-walterWhite p-5">
      <Image 
        width={133}
        height={23}
        src="/logo.png"
        alt="Full stack week"
      />
      <p className="text-sm font-medium text-primaryDarker">Todos os direitos reservados.</p>
    </div>
  );
}

export default Footer