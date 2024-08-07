import "./globals.css";
import Link from "next/link"

export const metadata = {
  title: "잔디농장",
  description: "Generated by create next app",
};

const NAV_LIST = [
  ["/",         "홈"],
  ["/mypage",   "마이페이지"],
  ["/todo",     "일일 TODO"],
  ["/projects", "프로젝트"]
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="text-blue-500 navbar">
          {
            NAV_LIST.map((item, i) => (
              <div className="menu-btn" key={i}>
                <Link href={item[0]}>{item[1]}</Link>
              </div>
            ))
          }
        </div>
        {children}
      </body>
    </html>
  );
}
