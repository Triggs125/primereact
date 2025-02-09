import { DocSearch } from '@docsearch/react';
import { useEffect, useRef } from 'react';
import pkg from '../../package.json';
import { StyleClass } from '../lib/styleclass/StyleClass';
import Link from 'next/link';
import { classNames } from '../lib/utils/Utils';

export default function Topbar(props) {
    const versionsRef = useRef(null);
    const versions = [
        {
            name: `v${pkg.version.split('.')[0]}`,
            version: pkg.version,
            url: 'https://www.primereact.org'
        },
        {
            name: 'v8',
            version: '8.7.0',
            url: 'https://www.primefaces.org/primereact-v8'
        },
        {
            name: 'v7',
            version: '7.1.0',
            url: 'https://www.primefaces.org/primereact-v7'
        },
        {
            name: 'v6',
            version: '6.6.0',
            url: 'https://www.primefaces.org/primereact-v6'
        },
        {
            name: 'v5',
            version: '5.0.2',
            url: 'https://www.primefaces.org/primereact-v5'
        },
        {
            name: 'v4',
            version: '4.2.2',
            url: 'https://www.primefaces.org/primereact-v4'
        }
    ];

    {
        /* doc https://docsearch.algolia.com/docs/api/#transformitems */
    }

    function handleDocSearchTransformItems(items) {
        const isLocalhost = process.env.NODE_ENV !== 'production';

        return items.map((item) => {
            if (isLocalhost) {
                const url = new URL(item.url);

                url.protocol = window.location.protocol;
                url.hostname = window.location.hostname;
                url.port = window.location.port;
                item.url = url.toString();
            }

            return item;
        });
    }

    const onMenuButtonClick = () => {
        props.onMenuButtonClick();
    };

    const onConfigButtonClick = () => {
        props.onConfigButtonClick();
    };

    const containerElement = useRef(null);
    const scrollListener = useRef();

    const bindScrollListener = () => {
        scrollListener.current = () => {
            if (containerElement && containerElement.current) {
                if (window.scrollY > 0) containerElement.current.classList.add('layout-topbar-sticky');
                else containerElement.current.classList.remove('layout-topbar-sticky');
            }
        };

        window.addEventListener('scroll', scrollListener.current);
    };

    const unbindScrollListener = () => {
        if (scrollListener.current) {
            window.removeEventListener('scroll', scrollListener.current);
            scrollListener.current = null;
        }
    };

    useEffect(() => {
        bindScrollListener();

        return function unbind() {
            unbindScrollListener();
        };
    }, []);

    const toggleDarkMode = () => {
        props.darkModeSwitch();
    };

    return (
        <div ref={containerElement} className="layout-topbar">
            <div className="layout-topbar-inner">
                <div className="layout-topbar-logo-container">
                    <Link href="/">
                        <a className="layout-topbar-logo" aria-label="PrimeReact logo">
                            <svg width="165" height="40" viewBox="0 0 165 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M35.9876 15.5318L33.2441 20.2402L35.9822 24.9394C36.9812 26.6537 36.9812 28.7006 35.9823 30.4148C34.9834 32.1292 33.1942 33.1526 31.1963 33.1526H25.72L23.1875 37.4987C22.1781 39.231 20.3701 40.2653 18.3512 40.2653C16.3322 40.2653 14.5242 39.231 13.5148 37.4987L10.9823 33.1526H5.4951C3.51173 33.1526 1.73552 32.1366 0.743811 30.4347C-0.247901 28.7327 -0.247901 26.7006 0.743811 24.9988L3.4874 20.2903L0.749194 15.5912C-0.249731 13.8769 -0.249731 11.83 0.749194 10.1157C1.74812 8.40136 3.53729 7.37791 5.53514 7.37791H11.0115L13.544 3.0319C14.5534 1.29964 16.3616 0.265259 18.3804 0.265259C20.3994 0.265259 22.2072 1.29954 23.2167 3.0319L25.7491 7.37791H31.2364C33.2198 7.37791 34.996 8.394 35.9877 10.0959C36.9794 11.7978 36.9794 13.8299 35.9876 15.5318ZM18.3804 1.46321C16.7985 1.46316 15.3819 2.27351 14.591 3.63086L12.4076 7.37791H24.353L22.1696 3.63086C21.3788 2.27351 19.9622 1.46321 18.3804 1.46321ZM25.605 30.954L25.5464 31.0547L25.5379 31.0693L25.3971 31.311L24.6487 32.5954L24.5198 32.8165L22.9647 35.4854L22.4958 36.2901L22.1655 36.8569L22.1531 36.8597L22.1457 36.8724C21.3548 38.2298 19.912 38.6208 18.3302 38.6207C16.7506 38.6207 15.3621 38.232 14.5706 36.8782L14.5456 36.8719L13.7429 35.4943L13.5418 35.1493L4.88344 20.2903L6.45393 17.5953L6.45414 17.5962L9.22427 12.8446L9.22233 12.8443L9.53677 12.3047L9.53882 12.3051L11.7129 8.57581L25.0516 8.57117L31.848 20.2403L25.605 30.954ZM34.9353 29.8159C34.1548 31.1551 32.7571 31.9547 31.1963 31.9547H26.418L32.546 21.4381L34.9352 25.5383C35.7156 26.8776 35.7156 28.4767 34.9353 29.8159ZM1.79084 29.8357C2.56402 31.1626 3.94876 31.9547 5.49508 31.9547H10.2843L4.18542 21.4883L1.79084 25.5976C1.0177 26.9245 1.0177 28.5089 1.79084 29.8357ZM1.79629 14.9923C1.01589 13.653 1.01589 12.0539 1.79629 10.7146C2.57663 9.37537 3.97434 8.57579 5.53514 8.57579H10.3135L4.18544 19.0924L1.79629 14.9923ZM31.2363 8.57579C32.7827 8.57579 34.1675 9.36796 34.9406 10.6949C35.7138 12.0216 35.7138 13.606 34.9406 14.9329L32.546 19.0424L26.4472 8.57579H31.2363Z"
                                    fill="var(--primary-color)"
                                />
                                <path d="M24.8834 22.1517L22.8237 21.6989L24.4257 23.963V30.9819L29.5005 26.4536L29.9182 18.7555L27.4008 19.6611L24.8834 22.1517Z" fill="var(--primary-color)" />
                                <path d="M12.0675 22.1517L14.1272 21.6989L12.5252 23.963V30.9819L7.45046 26.4536L7.03271 18.7555L9.55011 19.6611L12.0675 22.1517Z" fill="var(--primary-color)" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.2118 24.4159L15.0426 21.699L16.1869 22.3782H20.764L21.9083 21.699L23.7391 24.4159V34.6046L21.5995 38.645H14.9336L13.2118 34.6046V24.4159Z"
                                    fill="var(--primary-color)"
                                />
                                <path d="M24.4257 35.2837L27.4008 32.3404V29.397L24.4257 31.8875V35.2837Z" fill="var(--primary-color)" />
                                <path d="M12.5253 35.2837L9.55016 32.3404V29.397L12.5253 31.8875V35.2837Z" fill="var(--primary-color)" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.0178 8.56689H15.5004L13.6696 12.8688L16.6447 21.4725H20.5352L23.2814 12.8688L21.4506 8.56689H18.9332V21.4725H18.0178V8.56689Z" fill="var(--primary-color)" />
                                <path d="M16.6446 21.4724L6.80391 17.8498L5.43079 12.1895L13.8984 12.8687L16.8735 21.4724H16.6446Z" fill="var(--primary-color)" />
                                <path d="M20.5352 21.4724L30.3759 17.8498L31.749 12.1895L23.0526 12.8687L20.3063 21.4724H20.5352Z" fill="var(--primary-color)" />
                                <path d="M23.7391 12.1895L28.1273 11.7367L25.341 8.56689H22.1371L23.7391 12.1895Z" fill="var(--primary-color)" />
                                <path d="M13.2119 12.1895L8.82367 11.7367L11.6099 8.56689H14.8138L13.2119 12.1895Z" fill="var(--primary-color)" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M55.7314 28.7256V11.805C55.7314 11.5847 55.8636 11.4525 56.084 11.4525H61.3716C63.4426 11.4525 64.5442 12.5541 64.5442 14.6251V20.0009C64.5442 22.0499 63.4426 23.1735 61.3716 23.1735H58.7278V28.7256C58.7278 28.9459 58.6176 29.0781 58.3753 29.0781H56.084C55.8636 29.0781 55.7314 28.9459 55.7314 28.7256ZM58.7278 20.2653H60.6666C61.2615 20.2653 61.5479 19.9348 61.5479 19.384V15.242C61.5479 14.6692 61.2615 14.3607 60.6666 14.3607H58.7278V20.2653ZM75.5823 20.0009V14.6251C75.5823 12.5541 74.4807 11.4525 72.4097 11.4525H66.8796C66.6593 11.4525 66.5271 11.5847 66.5271 11.805V28.7256C66.5271 28.9459 66.6593 29.0781 66.8796 29.0781H69.171C69.3913 29.0781 69.5235 28.9459 69.5235 28.7256V23.1735H71.0437L72.5198 28.7697C72.5639 28.968 72.6741 29.0781 72.8944 29.0781H75.1857C75.4281 29.0781 75.5602 28.9459 75.4941 28.6815L73.9739 22.9092C75.0315 22.4465 75.5823 21.4771 75.5823 20.0009ZM69.5235 20.2653H71.7046C72.2775 20.2653 72.5859 19.9569 72.5859 19.384V15.242C72.5859 14.6692 72.2775 14.3607 71.7046 14.3607H69.5235V20.2653ZM80.4293 11.4525H78.138C77.8956 11.4525 77.7855 11.5847 77.7855 11.805V28.7256C77.7855 28.9459 77.8956 29.0781 78.138 29.0781H80.4293C80.6496 29.0781 80.7818 28.9459 80.7818 28.7256V11.805C80.7818 11.5847 80.6496 11.4525 80.4293 11.4525ZM92.1944 11.4525H95.1026C95.389 11.4525 95.5433 11.6067 95.5433 11.8932V28.6375C95.5433 28.9239 95.389 29.0781 95.1026 29.0781H93.0536C92.7672 29.0781 92.613 28.9239 92.613 28.6375V18.7231H92.4588L90.2776 28.6815C90.2115 28.9459 90.0573 29.0781 89.7929 29.0781H88.7133C88.449 29.0781 88.2947 28.9459 88.2286 28.6815L86.0475 18.7231H85.8933V28.6375C85.8933 28.9239 85.739 29.0781 85.4526 29.0781H83.4257C83.1393 29.0781 82.985 28.9239 82.985 28.6375V11.8932C82.985 11.6067 83.1393 11.4525 83.4257 11.4525H86.3339C86.5983 11.4525 86.7525 11.5847 86.8186 11.8491L89.2641 22.821L91.7097 11.8491C91.7758 11.5847 91.93 11.4525 92.1944 11.4525ZM106.537 14.0082V11.805C106.537 11.5847 106.449 11.4525 106.185 11.4525H98.0769C97.8787 11.4525 97.7465 11.5847 97.7465 11.805V28.7256C97.7465 28.9459 97.8787 29.0781 98.0769 29.0781H106.185C106.449 29.0781 106.537 28.9459 106.537 28.7256V26.5224C106.537 26.2801 106.449 26.1699 106.185 26.1699H100.677V21.7194H104.885C105.105 21.7194 105.237 21.5872 105.237 21.3449V19.1637C105.237 18.9214 105.105 18.7892 104.885 18.7892H100.677V14.3828H106.185C106.449 14.3828 106.537 14.2285 106.537 14.0082Z"
                                    fill="var(--text-color)"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M117.707 14.6251V20.0009C117.707 21.4771 117.156 22.4465 116.098 22.9092L117.619 28.6815C117.685 28.9459 117.552 29.0781 117.31 29.0781H115.019C114.798 29.0781 114.688 28.968 114.644 28.7697L113.168 23.1735H111.648V28.7256C111.648 28.9459 111.516 29.0781 111.295 29.0781H109.004C108.784 29.0781 108.651 28.9459 108.651 28.7256V11.805C108.651 11.5847 108.784 11.4525 109.004 11.4525H114.534C116.605 11.4525 117.707 12.5541 117.707 14.6251ZM111.648 20.2653H113.829C114.402 20.2653 114.71 19.9569 114.71 19.384V15.242C114.71 14.6692 114.402 14.3607 113.829 14.3607H111.648V20.2653ZM128.701 14.0082V11.805C128.701 11.5847 128.612 11.4525 128.348 11.4525H120.24C120.042 11.4525 119.91 11.5847 119.91 11.805V28.7256C119.91 28.9459 120.042 29.0781 120.24 29.0781H128.348C128.612 29.0781 128.701 28.9459 128.701 28.7256V26.5224C128.701 26.2801 128.612 26.1699 128.348 26.1699H122.84V21.7194H127.048C127.269 21.7194 127.401 21.5872 127.401 21.3449V19.1637C127.401 18.9214 127.269 18.7892 127.048 18.7892H122.84V14.3828H128.348C128.612 14.3828 128.701 14.2285 128.701 14.0082ZM140.862 29.0781H138.527C138.329 29.0781 138.218 28.968 138.174 28.7697L137.557 25.553H133.636L133.041 28.7697C132.997 28.968 132.887 29.0781 132.688 29.0781H130.331C130.089 29.0781 129.978 28.9459 130.045 28.7036L133.702 11.761C133.746 11.5406 133.878 11.4525 134.076 11.4525H137.139C137.337 11.4525 137.469 11.5406 137.513 11.761L141.171 28.7036C141.215 28.9459 141.127 29.0781 140.862 29.0781ZM135.597 15.3081L137.007 22.9973H134.187L135.597 15.3081ZM151.548 14.6251V17.0046C151.548 17.2249 151.416 17.3571 151.195 17.3571H148.992C148.75 17.3571 148.64 17.2249 148.64 17.0046V15.242C148.64 14.6692 148.331 14.3607 147.758 14.3607H146.613C146.018 14.3607 145.731 14.6692 145.731 15.242V25.2886C145.731 25.8835 146.04 26.1699 146.613 26.1699H147.758C148.331 26.1699 148.64 25.8835 148.64 25.2886V23.5261C148.64 23.3057 148.75 23.1735 148.992 23.1735H151.195C151.416 23.1735 151.548 23.3057 151.548 23.5261V25.9055C151.548 27.9765 150.424 29.0781 148.375 29.0781H145.908C143.837 29.0781 142.713 27.9765 142.713 25.9055V14.6251C142.713 12.5541 143.837 11.4525 145.908 11.4525H148.375C150.424 11.4525 151.548 12.5541 151.548 14.6251ZM161.11 11.4525H153.002C152.782 11.4525 152.649 11.5847 152.649 11.805V14.0082C152.649 14.2285 152.782 14.3607 153.002 14.3607H155.558V28.7256C155.558 28.968 155.69 29.0781 155.91 29.0781H158.201C158.444 29.0781 158.554 28.968 158.554 28.7256V14.3607H161.11C161.352 14.3607 161.462 14.2285 161.462 14.0082V11.805C161.462 11.5847 161.352 11.4525 161.11 11.4525Z"
                                    fill="var(--primary-color)"
                                />
                            </svg>
                        </a>
                    </Link>
                    <Link href="/" aria-label="PrimeReact logo">
                        <a className="layout-topbar-icon">
                            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                                    fill="var(--primary-color)"
                                />
                                <path
                                    d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                                    fill="var(--text-color)"
                                />
                            </svg>
                        </a>
                    </Link>
                </div>

                <ul className="flex list-none m-0 p-0 gap-2 align-items-center">
                    <li>
                        <DocSearch appId="SCRI13XXZO" apiKey="ea9e6c8a983c5646d6b9079921d4aed7" indexName="primereact" container="" debug={false} transformItems={handleDocSearchTransformItems} />
                    </li>
                    <li>
                        <a
                            href="https://github.com/primefaces/primereact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                        >
                            <i className="pi pi-github text-700"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://discord.gg/gzKFYnpmCY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                        >
                            <i className="pi pi-discord text-700"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/orgs/primefaces/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                        >
                            <i className="pi pi-comments text-700"></i>
                        </a>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                            onClick={toggleDarkMode}
                        >
                            <i className={classNames('pi text-700', { 'pi-moon': props.dark, 'pi-sun': !props.dark })}></i>
                        </button>
                    </li>
                    {props.showConfigurator && (
                        <li>
                            <button type="button" className="p-button flex-shrink-0 flex border-1 w-2rem h-2rem p-0 align-items-center justify-content-center transition-all transition-duration-300 min-w-0" onClick={onConfigButtonClick}>
                                <i className="pi pi-palette"></i>
                            </button>
                        </li>
                    )}

                    <li className="relative">
                        <StyleClass nodeRef={versionsRef} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                            <button
                                ref={versionsRef}
                                type="button"
                                className="p-link flex align-items-center surface-card h-2rem px-2 hover:surface-hover border-1 border-solid surface-border transition-all transition-duration-300 hover:border-primary"
                            >
                                <span className="text-900">{versions && versions.length ? versions[0].version : ''}</span>
                                <span className="ml-2 pi pi-angle-down text-600"></span>
                            </button>
                        </StyleClass>
                        <div className="p-3 surface-overlay hidden absolute right-0 top-auto border-round shadow-2 origin-top w-12rem">
                            <ul className="list-none m-0 p-0">
                                {versions.map((version) => {
                                    return (
                                        <li role="none" key={version.version}>
                                            <a href={version.url} className="block p-2 border-round hover:surface-hover w-full">
                                                <span className="font-bold text-900">{version.name}</span>
                                                <span className="ml-2 text-700">({version.version})</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </li>
                    {props.showMenuButton && (
                        <li className="menu-button">
                            <button
                                type="button"
                                className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary menu-button"
                                onClick={onMenuButtonClick}
                                aria-haspopup
                                aria-label="Menu"
                            >
                                <i className="pi pi-bars text-700"></i>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
