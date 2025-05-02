import i18n from '../../../../tools/i18n';

const { t } = i18n;

export const gender: { label: string, value: string }[] = t(
  'outerLayout.form.register.gender',
  { returnObjects: true }
) as { label: string; value: string }[];

export const getRelatedLabel = (value: string, labelValueArr: { label: string, value: string }[]) => {
  const relatedLabel = labelValueArr.find(lang => lang.value === value)?.label;
  return relatedLabel;
};