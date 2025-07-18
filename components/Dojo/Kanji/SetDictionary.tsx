'use client';
import clsx from 'clsx';
import { cardBorderStyles } from '@/static/styles';
import N5KanjiArray from '@/static/kanji/N5';
import N4KanjiArray from '@/static/kanji/N4';
import N3KanjiArray from '@/static/kanji/N3';
import N2KanjiArray from '@/static/kanji/N2';
// import Banner from '@/components/reusable/Banner';
import { useParams } from 'next/navigation';
import { ISet } from '@/lib/interfaces';
import useKanaKanjiStore from '@/store/useKanaKanjiStore';
import { ChevronsLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonBorderStyles } from '@/static/styles';

const createKanjiSetRanges = (numSets: number) =>
  Array.from({ length: numSets }, (_, i) => i + 1).reduce(
    (acc, curr) => ({
      ...acc,
      [`set-${curr}`]: [(curr - 1) * 10, curr * 10],
    }),
    {}
  );

const kanjiSetSliceRanges = createKanjiSetRanges(200);

const displayKanjiArray = {
  n5: N5KanjiArray,
  n4: N4KanjiArray,
  n3: N3KanjiArray,
  n2: N2KanjiArray,
};

const KanjiSetDictionary = () => {
  const pathname = usePathname();
  const href = pathname.split('/').slice(0, -1).join('/');
  console.log(href);

  const selectedKanjiCollection = useKanaKanjiStore(
    state => state.selectedKanjiCollection
  );

  // const jlptToCollectionMap = {
  //   n5: 'Collection 1',
  //   n4: 'Collection 2',
  //   n3: 'Collection 3',
  //   n2: 'Collection 4',
  // };

  const params = useParams();
  const { set } = params as unknown as ISet;

  const sliceRange =
    kanjiSetSliceRanges[set as keyof typeof kanjiSetSliceRanges];

  return (
    <div className="min-h-[100dvh] max-w-[100dvw] px-4 sm:px-8 md:px-20 lg:px-30 xl:px-40 2xl:px-60 flex flex-col gap-4 pb-10">
      {/* <Banner
        subheading={`Kanji 漢字, ${
          jlptToCollectionMap[
            selectedKanjiCollection as keyof typeof jlptToCollectionMap
          ]
        }, ${set.split('-').join('  ').toUpperCase()}`}
      /> */}
      <Link href={href}>
        <button className={clsx(buttonBorderStyles,'py-4 px-8 mt-4')}>
          <ChevronsLeft />
        </button>
      </Link>
      <div className={clsx('flex flex-col', cardBorderStyles)}>
        {displayKanjiArray[
          selectedKanjiCollection as keyof typeof displayKanjiArray
        ]
          .slice(sliceRange[0], sliceRange[1])
          .map((kanjiObj, i) => (
            <div
              key={kanjiObj.id}
              className={clsx(
                'flex flex-row justify-start items-center gap-4 p-4',
                i !== 9 && 'border-b-1 border-[var(--border-color)]'
              )}
            >
              <div className="relative w-full max-w-[100px] aspect-square flex items-center justify-center ">
                {/* 4-segment square background */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-1 border-[var(--border-color)] rounded-xl bg-[var(--background-color)]">
                  <div className=" border-r border-b border-[var(--border-color)]"></div>
                  <div className=" border-b border-[var(--border-color)]"></div>
                  <div className=" border-r border-[var(--border-color)]"></div>
                  <div className=""></div>
                </div>

                <p
                  lang="ja"
                  className="text-7xl pb-2 relative z-10"
                >
                  {kanjiObj.kanjiChar}
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col md:flex md:flex-row gap-2 w-full">
                  <div
                    className={clsx(
                      'flex flex-row gap-2',
                      (kanjiObj.onyomi[0] === '' ||
                        kanjiObj.onyomi.length === 0) &&
                        'hidden'
                    )}
                  >
                    {kanjiObj.onyomi.map(onyomiReading => (
                      <span
                        key={onyomiReading}
                        className={clsx(
                          'rounded-lg px-1.5 py-1 flex flex-row items-center text-sm md:text-base',
                          'bg-[var(--border-color)]',
                          'text-[var(--secondary-color)]'
                        )}
                      >
                        {onyomiReading}
                      </span>
                    ))}
                  </div>
                  {/*HR Divider*/}
                  <div
                    className={clsx(
                      'border-t-1 w-full',
                      'md:border-l-1 md:h-auto md:border-t-0 md:w-0 md:mx-1',
                      'border-[var(--border-color)]',
                      kanjiObj.onyomi[0] === '' ||
                        ((kanjiObj.kunyomi[0] === '' ||
                          kanjiObj.onyomi.length === 0 ||
                          kanjiObj.kunyomi.length === 0) &&
                          'hidden')
                    )}
                  />{' '}
                  {/*HR Divider*/}
                  <div
                    className={clsx(
                      'flex flex-row gap-2',
                      (kanjiObj.kunyomi[0] === '' ||
                        kanjiObj.kunyomi.length === 0) &&
                        'hidden'
                    )}
                  >
                    {kanjiObj.kunyomi.map(kunyomiReading => (
                      <span
                        key={kunyomiReading}
                        className={clsx(
                          'rounded-lg px-1.5 py-1 flex flex-row items-center text-sm md:text-base',
                          'bg-[var(--border-color)]',
                          'text-[var(--secondary-color)]'
                        )}
                      >
                        {kunyomiReading}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xl md:text-2xl">
                  {kanjiObj.fullDisplayMeanings.join(', ')}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KanjiSetDictionary;
