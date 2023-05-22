import Member from "@/components/Members/Member/Member";
import { MemberInterface } from "@/types/members";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./MembersSnippet.module.css";

interface Props {
  members: MemberInterface[];
}

const Members = (props: Props) => {
  const { members } = props;

  // sort members by added date property
  const membersSorted = members.sort((a, b) => {
    const firstDate = new Date(a.added);
    const secondDate = new Date(b.added);
    if (firstDate < secondDate) return -1;
    return 1;
  });

  // 6 random members picked from original members array
  const membersRandom = members.sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <section className={styles.avatars}>
      <h2>Some of our members</h2>
      <div className="mt-10 mb-20 grid grid-cols-1 gap-y-10 md:grid md:grid-cols-2 md:grid-rows-3 md:gap-x-10 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-10">
        {membersRandom.slice(0, 6).map((member) => (
          <Member key={member.slug} member={member} />
        ))}
      </div>
      <div>
        <Link href="/members" className={styles.button}>
          View all members <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
      </div>
    </section>
  );
};

export default Members;
