import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      {/* <Head>
        <title>Max&apos;s Blog</title>
        <meta
          name="description"
          content="I blog about web development - especially frontend frameworks like React"
        />
      </Head> */}
      <div className={classes.image}>
        <Image
          src="/images/site/max.jfif"
          alt="An image showing Max"
          width={300}
          height={300}
        ></Image>
      </div>
      <h1>Hi, I&apos;m Max</h1>
      <p>
        I blog about web development - especially frontend frameworks like React
      </p>
    </section>
  );
}

export default Hero;
