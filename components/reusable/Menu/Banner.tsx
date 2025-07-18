'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const Banner = () => {
  const pathname = usePathname();

  const subheading =
    pathname === '/kana'
      ? 'Kana あ'
      : pathname === '/kanji'
      ? 'Kanji 見'
      : pathname === '/vocabulary'
      ? 'Vocabulary 彙'
      : pathname === '/preferences'
      ? 'Preferences 設'
      : '';
  return (
    <h2 className={clsx('text-3xl pt-6', 'flex items-center gap-2')}>
      <span className="text-[var(--secondary-color)]">
        {subheading.split(' ')[1]}
      </span>
      <span>{subheading.split(' ')[0]}</span>
    </h2>
  );
};

export default Banner;
