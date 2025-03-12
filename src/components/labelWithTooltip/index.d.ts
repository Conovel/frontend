interface LabelWithTooltipProps {
  /** ラベル */
  label: string;
  /** Tooltip必要か */
  hasTooltip?: boolean;
  /** Tooltipのテキスト */
  tooltipText?: React.ReactNode;
}
/**
 * Tooltip可能なラベル
 */
export declare const LabelWithTooltip: ({
  label,
  hasTooltip,
  tooltipText,
}: LabelWithTooltipProps) => import('react/jsx-runtime').JSX.Element;
export {};
