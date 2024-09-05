import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "Lalith Kumar",
    lastName: "R",
    email: "lalithkumar2004@outlook.com",
  };
  return (
    <section className="home">
      <div className="home-content">
        <header>
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 500 }, { currentBalance: 123 }]}
      />
    </section>
  );
};

export default Home;
