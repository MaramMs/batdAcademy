'use client';
import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import styles from '@/sass/components/ui/range.module.scss';

const Range = ({ min = 0, max = 2000, step = 10, onChange }) => {
  const [values, setValues] = useState([min, max]);

  const handleChange = (vals) => {
    setValues(vals);
    onChange?.({ min: vals[0], max: vals[1] });
  };

  return (
    <div className={styles.rangeWrapper}>
      <Slider.Root
        className={styles.rangeRoot}
        min={min}
        max={max}
        step={step}
        value={values}
        onValueChange={handleChange}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className={styles.rangeTrack}>
          <Slider.Range className={styles.rangeRange} />
        </Slider.Track>

        <Slider.Thumb className={styles.rangeThumb} aria-label="Minimum price" />
        <Slider.Thumb className={styles.rangeThumb} aria-label="Maximum price" />
      </Slider.Root>

      <div className={styles.rangeLabels}>
        <span>{values[0]}$</span>
        <span>{values[1]} $</span>
      </div>
    </div>
  );
};

export default Range;