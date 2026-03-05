import type { CSSProperties } from "react";

type InspectorStyleBoxProps = {
  title: string;
  command: string;
  resultLines: string[];
  terminalLabel?: string;
  className?: string;
  animateCommand?: boolean;
};

export function InspectorStyleBox({
  title,
  command,
  resultLines,
  terminalLabel = "run-inspector.sh",
  className = "",
  animateCommand = true,
}: InspectorStyleBoxProps) {
  const typingStyle = animateCommand
    ? ({
        "--typing-width": `${command.length}ch`,
        "--typing-steps": `${command.length}`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_24px_48px_-40px_rgba(3,8,20,0.9)] ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-light">
          {title}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
        </div>
      </div>

      <div className="faint-grid rounded-lg border border-[var(--border)] bg-[var(--surface-soft)]/80 p-4">
        <div className="rounded-md border border-[var(--border)] bg-[#0b1222]/80 p-3 font-mono text-xs">
          <div className="mb-2 flex items-center gap-2 text-muted-light">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]/90" />
            <span>{terminalLabel}</span>
          </div>

          <div className="flex items-center text-[#7dd3fc]">
            <span className="mr-2 text-[#34d399]">$</span>
            <span
              className={`inline-block overflow-hidden whitespace-nowrap ${
                animateCommand ? "terminal-type-command" : ""
              }`}
              style={typingStyle}
            >
              {command}
            </span>
            {animateCommand ? (
              <span className="terminal-caret ml-0.5" aria-hidden />
            ) : null}
          </div>

          <div className="mt-3 space-y-1 text-[11px] text-muted">
            {resultLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
