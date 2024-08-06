import { Poppins } from "next/font/google"

const font = Poppins({
  subsets:['latin-ext'],
  weight: ["600"]
});

export const Header = ({ label }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className={`text-3xl font-semibold ${font.className}`}>
        로그인
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  )
}