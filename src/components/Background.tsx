import Image from "next/image";

export default function Background({
  position = "50% 90%",
  overlayClassName = "bg-white/45",
}: {
  position?: string;
  overlayClassName?: string;
}) {
  return (
    <div className="absolute inset-0 -z-20">
      <Image
        src="/images/print.png"
        alt="배경"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}