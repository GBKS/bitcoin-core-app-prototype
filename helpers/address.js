import { bech32 } from 'bech32';
import { validate, getAddressInfo } from 'bitcoin-address-validation';

export const ADDRESS_TYPES = {
    P2PKH: "P2PKH (Legacy)",
    P2SH: "P2SH (Legacy)",
    P2WPKH: "P2WPKH (SegWit, Bech32)",
    P2WSH: "P2WSH (SegWit, Bech32)",
    P2TR: "P2TR (Taproot, Bech32m)",
    HUMAN_READABLE_ADDRESS: "Human Readable Address",
    LIGHTNING_INVOICE: "Lightning Invoice",
    LIGHTNING_OFFER: "Lightning Offer",
    LIGHTNING_ADDRESS: "Lightning Address",
    SILENT_PAYMENTS_ADDRESS: "Silent Payments Address",
    BIP47_PAYMENT_CODE: "BIP47 Payment code",
    CASHU_TOKEN: "Cashu Token",
    FEDIMINT_TOKEN: 'Fedimint Token',
    BECH32_INVALID: "Bech32 Invalid",
    INVALID: "Invalid or unsupported address type"
}

export const AddressHelper = {

    getAddressInfo: (address) => {
        try {
            const result = getAddressInfo(address);
            result.isValid = true
            return result;
        } catch(error) {
            return { isValid: false, error: error.message };
        }
    },

    validateBitcoinAddress: (address) => {
        try {
            return validate(address);
        } catch(error) {
            return { isValid: false, error: error.message };
        }
    },

    isBitcoinNetworkAddressType: (addressType) => {
        const types = [
            Address_TYPES.P2PKH,
            Address_TYPES.P2SH,
            Address_TYPES.P2WPKH,
            Address_TYPES.P2WSH,
            Address_TYPES.P2TR
        ]
        return types.indexOf(addressType) !== -1;
    },

    getAddressType: (address) => {
        // Regular expressions for different address types
        const p2pkhRegex = /^[1][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
        const p2shRegex = /^[3][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
        const bech32Regex = /^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/;
        const bech32mRegex = /^bc1p[a-zA-HJ-NP-Z0-9]{58,58}$/;
        const bolt11Regex = /^ln[a-z0-9]{1,}$/i;
        const bolt12Regex = /^lno[a-z0-9]{1,}$/i;
        const cashuTokenRegex = /^cashuAeyJ[A-Za-z0-9_-]{1,}$/;
        const fedimintTokenRegex = /^fm[1-9A-HJ-NP-Za-km-z]{1,}$/;
        const silentPaymentRegex = /^sp1q[a-zA-Z0-9]{112,}$/;
        const bip47PaymentCodeRegex = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{80}$/;

        // Check for P2PKH
        if (p2pkhRegex.test(address)) {
            return ADDRESS_TYPES.P2PKH
        }

        // Check for P2SH
        if (p2shRegex.test(address)) {
            return ADDRESS_TYPES.P2SH
        }

        // Check for Bech32
        if (bech32Regex.test(address)) {
            if (bech32mRegex.test(address)) {
                return ADDRESS_TYPES.P2TR;
            }

            try {
                console.log('decode', address)
                const decoded = bech32.decode(address);
                console.log('decoded', decoded)
                const words = decoded.words;

                // Extract the witness version and program
                const witnessVersion = words[0];  // First word is the witness version
                const witnessProgram = bech32.fromWords(words.slice(1));  // Convert the remaining words into the witness program (bytes)

                console.log('witnessProgram', witnessProgram, witnessProgram.length);
                // Determine if it is P2WPKH or P2WSH based on the witness program length
                if (witnessVersion === 0) {
                    if (witnessProgram.length === 20) {
                        console.log('This is a P2WPKH address (20-byte witness program).');
                        return ADDRESS_TYPES.P2WPKH;
                    } else if (witnessProgram.length === 32) {
                        console.log('This is a P2WSH address (32-byte witness program).');
                        return ADDRESS_TYPES.P2WSH
                    } else {
                        console.log('Invalid witness program length for version 0.');
                        return ADDRESS_TYPES.INVALID
                    }
                } else {
                    console.log('Unsupported witness version:', witnessVersion);
                    return ADDRESS_TYPES.INVALID
                }
            } catch(error) {
                console.log('Error', error)
                return ADDRESS_TYPES.BECH32_INVALID;
            }
        }

        console.log('bolt12Regex', bolt12Regex.test(address), address)
        if (bolt12Regex.test(address)) {
            return ADDRESS_TYPES.LIGHTNING_OFFER
        }

        if (bolt11Regex.test(address)) {
            return ADDRESS_TYPES.LIGHTNING_INVOICE
        }

        if (cashuTokenRegex.test(address)) {
            return ADDRESS_TYPES.CASHU_TOKEN
        }

        if (fedimintTokenRegex.test(address)) {
            return ADDRESS_TYPES.FEDIMINT_TOKEN
        }

        if (silentPaymentRegex.test(address)) {
            return ADDRESS_TYPES.SILENT_PAYMENTS_ADDRESS
        }

        console.log('bip47PaymentCodeRegex', bip47PaymentCodeRegex.test(address), address)
        if (bip47PaymentCodeRegex.test(address)) {
            return ADDRESS_TYPES.BIP47_PAYMENT_CODE
        }

        // If none of the above, it's an invalid or unsupported address type
        return ADDRESS_TYPES.INVALID;
    },

    getBech32Errors(address) {
        // Valid characters for Bech32 addresses
        const validChars = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

        console.log('getBech32Errors', address);

        try {
            // Find the position of the '1' separator
            const separatorIndex = address.indexOf('1');
            if (separatorIndex === -1) {
                return { isValid: false, error: 'Invalid address format: missing separator "1"' };
            }

            // Check for invalid characters and their positions
            const dataPartLowerCase = address.slice(separatorIndex + 1).toLowerCase();
            const invalidCharsInfo = [];

            for (let i = 0; i < dataPartLowerCase.length; i++) {
                const char = dataPartLowerCase[i];
                if (!validChars.includes(char)) {
                    invalidCharsInfo.push({
                        char: char,
                        position: separatorIndex + 1 + i
                    });
                }
            }
            
            if (invalidCharsInfo.length > 0) {
                return { 
                    isValid: false, 
                    error: 'Invalid character(s) found',
                    invalidCharsInfo: invalidCharsInfo
                };
            }

            const decoded = bech32.decode(address);
            const prefix = decoded.prefix;
            const words = decoded.words;

            // Check if it's a valid Bitcoin address prefix
            if (prefix !== 'bc' && prefix !== 'tb') {
                return { isValid: false, error: 'Invalid address prefix. Must be "bc" for mainnet or "tb" for testnet.' };
            }

            // Check the data part length
            if (words.length !== 32 && words.length !== 52) {
                return { isValid: false, error: 'Invalid data length. Must be 32 or 52 words.' };
            }

            // Detect Bech32 or Bech32m encoding
            const encoding = words.length === 32 ? 'Bech32' : 'Bech32m';

            // Verify checksum
            bech32.fromWords(words);

            return {
                isValid: true,
                encoding: encoding,
                prefix: prefix,
                type: prefix === 'bc' ? 'Mainnet' : 'Testnet'
            };
        } catch (error) {
            if (error instanceof bech32.Error) {
                switch (error.code) {
                    case 'INVALID_CHARS':
                    // This case is now handled before decoding
                    return { isValid: false, error: 'Invalid characters in the address.' };
                    case 'MIXED_CASE':
                    return { isValid: false, error: 'Mixed case characters in the address.' };
                    case 'INVALID_CHECKSUM':
                    return { isValid: false, error: 'Invalid checksum.' };
                    case 'INVALID_LENGTH':
                    return { isValid: false, error: 'Invalid address length.' };
                    default:
                    return { isValid: false, error: `Bech32 error: ${error.message}` };
                }
            } else {
                return { isValid: false, error: `Unexpected error: ${error.message}` };
            }
        }
    },

    tryFixingBech32Errors(address) {
        const charset = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
        let errorPositions = [];

        console.log('detectIncorrectBech32Characters', address);

        // Loop through each character in the address
        for (let i = 0; i < address.length; i++) {
            let valid = false;

            // console.log('i', i);

            // Try replacing the character at position i with each character from the charset
            for (let j = 0; j < charset.length; j++) {
                // console.log('j', j);

                if (address[i] !== charset[j]) {
                    // Replace character at position i with charset[j]
                    const modifiedAddress = address.substring(0, i) + charset[j] + address.substring(i + 1);
                    // console.log('modifiedAddress', modifiedAddress);

                    if(modifiedAddress == 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4') {
                        console.log('- ' + i)
                    }

                    try {
                        // Try decoding the modified address
                        bech32.decode(modifiedAddress);
                        valid = true; // If this works, the character at position i is erroneous
                        errorPositions.push({
                            position: i,
                            correctCharacter: charset[j]
                        });
                        break;
                    } catch (err) {
                        // Ignore errors and continue
                    }
                }
            }
        }

        console.log('errorPositions', errorPositions);

        return errorPositions;
    },

    detectIncorrectBech32Characters(address) {
        const charset = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
        let errorPositions = [];

        // Find the position of the '1' separator
        const separatorIndex = address.indexOf('1');
        if (separatorIndex === -1) {
            return { isValid: false, error: 'Invalid address format: missing separator "1"' };
        }

        // Check for invalid characters and their positions
        const dataPartLowerCase = address.slice(separatorIndex + 1).toLowerCase();

        for (let i = 0; i < dataPartLowerCase.length; i++) {
            const char = dataPartLowerCase[i];
            if (!charset.includes(char)) {
                errorPositions.push({
                    char: char,
                    position: separatorIndex + 1 + i
                });
            }
        }

        return {
            isValid: errorPositions.length === 0,
            errorPositions
        }
    },

    chunkAddress(value) {
        let newValue = value.replace(/\s/g, '');
        let formattedValue = '';
        let cursorOffset = 0;
    
        for (let i = 0; i < newValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += newValue[i];
        }
    
        return formattedValue.trim();
    }
}