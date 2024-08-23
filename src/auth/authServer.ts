export default interface InfoMail {
  messageId: string;
  envelope: {
    to: string[];
  };
  accepted: {
    to: string[];
  }[];
  rejected: {
    to: string[];
  }[];
  bounced: {
    to: string[];
  }[];
  delayeds: {
    to: string[];
  }[];
  scope: string[];
  messageCount: number;
}
