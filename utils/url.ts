function toASCII(input: string): string {
  try {
    const url = new URL(`http://${input}`);
    return url.hostname;
  } catch (error) {
    console.error('Invalid domain:', error);
    return input;
  }
}

// Example usage:
const domain1 = toASCII("example.com");
console.log(domain1); // Output: example.com

const domain2 = toASCII("пример.рф");
console.log(domain2); // Output: xn--e1afmkfd.xn--p1ai

const domain3 = toASCII("Invalid Domain");
console.log(domain3); // Output: Invalid Domain (and error message in console)


//Further example demonstrating usage within a function
function processDomain(input: string): string {
  const asciiDomain = toASCII(input);
  return `Processed domain: ${asciiDomain}`;
}

const result = processDomain("another-example.co.uk");
console.log(result); // Output: Processed domain: another-example.co.uk

