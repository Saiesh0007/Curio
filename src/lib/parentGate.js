const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

export const MAX_ATTEMPTS = 3;
export const LOCKOUT_SECONDS = 30;
const SESSION_KEY = 'curioParentUnlocked';

function belowHundred(n) {
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '');
}

export function numberToWords(n) {
  const thousands = Math.floor(n / 1000);
  const hundreds = Math.floor((n % 1000) / 100);
  const rest = n % 100;
  return [
    thousands ? `${ONES[thousands]} thousand` : '',
    hundreds ? `${ONES[hundreds]} hundred` : '',
    rest ? belowHundred(rest) : '',
  ].filter(Boolean).join(' ');
}

export const newChallenge = () => 2000 + Math.floor(Math.random() * 8000);

export function isParentUnlocked() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'yes';
  } catch {
    return false;
  }
}

export function setParentUnlocked(value) {
  try {
    if (value) sessionStorage.setItem(SESSION_KEY, 'yes');
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage unavailable (private mode): the gate simply re-asks next time.
  }
}
