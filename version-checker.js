const { execSync } = require('child_process');

function getVersion(command) {
  try {
    return execSync(command).toString().trim();
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

const opensslVersion = getVersion('openssl version');
const nodeVersion = getVersion('node -v');

console.log('Current Versions:');
console.log(`OpenSSL: ${opensslVersion}`);
console.log(`Node.js: ${nodeVersion}`);

// Check if versions meet minimum requirements
// Note: Adjust these versions based on the specific requirements of your project
const minOpenSSLVersion = '1.1.1';
const minNodeVersion = '14.0.0';

function versionMeetsMinimum(current, minimum) {
  const currentParts = current.split('.');
  const minimumParts = minimum.split('.');
  for (let i = 0; i < minimumParts.length; i++) {
    if (parseInt(currentParts[i]) > parseInt(minimumParts[i])) return true;
    if (parseInt(currentParts[i]) < parseInt(minimumParts[i])) return false;
  }
  return true;
}

const opensslMeetsMin = versionMeetsMinimum(opensslVersion.split(' ')[1], minOpenSSLVersion);
const nodeMeetsMin = versionMeetsMinimum(nodeVersion.slice(1), minNodeVersion);

console.log('\nVersion Check Results:');
console.log(`OpenSSL meets minimum version (${minOpenSSLVersion}): ${opensslMeetsMin ? 'Yes' : 'No'}`);
console.log(`Node.js meets minimum version (${minNodeVersion}): ${nodeMeetsMin ? 'Yes' : 'No'}`);

if (!opensslMeetsMin || !nodeMeetsMin) {
  console.log('\nPlease update the following:');
  if (!opensslMeetsMin) console.log('- OpenSSL');
  if (!nodeMeetsMin) console.log('- Node.js');
  console.log('\nRefer to the provided instructions for updating these components.');
} else {
  console.log('\nYour system meets the minimum version requirements.');
}

